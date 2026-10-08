import os
import re
from pathlib import Path
from typing import List, Dict, Tuple

import chromadb
import ollama
from sentence_transformers import SentenceTransformer


# ============================================================
# CONFIGURATION
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DOCUMENTS_DIR = BASE_DIR / "documents"

CHROMA_DIR = BASE_DIR / "chroma_db"

COLLECTION_NAME = "sri_kumaran_hospital"

EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

OLLAMA_MODEL = "gemma3:1b"

# Number of chunks retrieved from ChromaDB
TOP_K = 5

# Maximum characters sent to the LLM as context
MAX_CONTEXT_CHARS = 12000


# ============================================================
# LOAD EMBEDDING MODEL
# ============================================================

print("Loading embedding model...")

embedding_model = SentenceTransformer(
    EMBEDDING_MODEL_NAME
)

print("Embedding model loaded.")


# ============================================================
# CHROMADB CLIENT
# ============================================================

chroma_client = chromadb.PersistentClient(
    path=str(CHROMA_DIR)
)


# ============================================================
# TEXT NORMALIZATION
# ============================================================

def normalize_text(text: str) -> str:
    """
    Normalize text for searching and matching.
    """

    text = text.lower()

    # Normalize common punctuation
    text = text.replace("-", " ")
    text = text.replace("_", " ")
    text = text.replace("/", " ")

    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text)

    return text.strip()


# ============================================================
# DOCUMENT LOADING
# ============================================================

def load_documents() -> List[Dict]:
    """
    Load every .txt file from the documents folder.

    Returns:
        [
            {
                "source": "02_doctors.txt",
                "text": "...",
            }
        ]
    """

    documents = []

    if not DOCUMENTS_DIR.exists():
        print(f"WARNING: Documents directory not found: {DOCUMENTS_DIR}")
        return documents

    txt_files = sorted(DOCUMENTS_DIR.glob("*.txt"))

    if not txt_files:
        print(f"WARNING: No .txt files found in {DOCUMENTS_DIR}")
        return documents

    for file_path in txt_files:

        try:
            text = file_path.read_text(
                encoding="utf-8"
            ).strip()

            if not text:
                continue

            documents.append(
                {
                    "source": file_path.name,
                    "text": text,
                }
            )

            print(
                f"Loaded document: {file_path.name}"
            )

        except Exception as error:

            print(
                f"Failed to read {file_path.name}: {error}"
            )

    print(
        f"Total documents loaded: {len(documents)}"
    )

    return documents


# ============================================================
# CHUNKING
# ============================================================

def create_chunks(
    text: str,
    source: str,
    max_chars: int = 1800
) -> List[Dict]:
    """
    Create reasonably sized chunks.

    The hospital documents already contain sections separated
    by blank lines, so we first preserve those sections.

    Very large sections are further split.
    """

    sections = re.split(
        r"\n\s*\n",
        text
    )

    chunks = []

    for section in sections:

        section = section.strip()

        if not section:
            continue

        # ----------------------------------------------------
        # If section is small enough, keep it intact
        # ----------------------------------------------------

        if len(section) <= max_chars:

            chunks.append(
                {
                    "source": source,
                    "text": section,
                }
            )

            continue

        # ----------------------------------------------------
        # Large section -> split by lines
        # ----------------------------------------------------

        lines = section.splitlines()

        current_chunk = ""

        for line in lines:

            line = line.strip()

            if not line:
                continue

            # If adding the next line becomes too large
            if (
                len(current_chunk) + len(line) + 1
                > max_chars
            ):

                if current_chunk.strip():

                    chunks.append(
                        {
                            "source": source,
                            "text": current_chunk.strip(),
                        }
                    )

                current_chunk = line

            else:

                if current_chunk:
                    current_chunk += "\n" + line
                else:
                    current_chunk = line

        if current_chunk.strip():

            chunks.append(
                {
                    "source": source,
                    "text": current_chunk.strip(),
                }
            )

    return chunks


# ============================================================
# CREATE ALL CHUNKS
# ============================================================

def build_all_chunks() -> List[Dict]:
    """
    Load every document and convert it into chunks.
    """

    documents = load_documents()

    all_chunks = []

    for document in documents:

        chunks = create_chunks(
            document["text"],
            document["source"]
        )

        all_chunks.extend(chunks)

    print(
        f"Total chunks created: {len(all_chunks)}"
    )

    return all_chunks


# ============================================================
# KEYWORD BOOSTING
# ============================================================

def keyword_score(
    question: str,
    chunk_text: str,
    source: str
) -> int:
    """
    Lightweight keyword relevance score.

    This is intentionally simple.

    ChromaDB performs semantic search.

    This additional score helps exact questions such as:

        "Who is the orthopedic doctor?"

    retrieve:

        02_doctors.txt

    rather than an unrelated hospital section.
    """

    q = normalize_text(question)
    c = normalize_text(chunk_text)
    s = normalize_text(source)

    score = 0

    # --------------------------------------------------------
    # Doctor related keywords
    # --------------------------------------------------------

    doctor_keywords = [
        "doctor",
        "doctors",
        "dr",
        "physician",
        "specialist",
        "surgeon",
        "doctor list",
        "doctor name",
    ]

    if any(word in q for word in doctor_keywords):

        if "doctor" in s:
            score += 8

    # --------------------------------------------------------
    # Orthopedic
    # --------------------------------------------------------

    orthopedic_keywords = [
        "orthopedic",
        "orthopaedic",
        "ortho",
        "bone",
        "joint",
        "spine",
        "fracture",
        "knee",
    ]

    if any(word in q for word in orthopedic_keywords):

        if any(
            word in c
            for word in [
                "vijayakumar",
                "orthopedic",
                "orthopaedic",
                "fracture",
                "joint",
                "spine",
                "knee",
            ]
        ):
            score += 12

    # --------------------------------------------------------
    # Pediatrics
    # --------------------------------------------------------

    pediatric_keywords = [
        "pediatric",
        "paediatric",
        "child",
        "children",
        "kids",
        "baby",
    ]

    if any(word in q for word in pediatric_keywords):

        if any(
            word in c
            for word in [
                "renukadevi",
                "pediatric",
                "paediatric",
            ]
        ):
            score += 12

    # --------------------------------------------------------
    # General medicine
    # --------------------------------------------------------

    medicine_keywords = [
        "general medicine",
        "general physician",
        "physician",
        "medicine doctor",
    ]

    if any(word in q for word in medicine_keywords):

        if any(
            word in c
            for word in [
                "palaniappan",
                "general medicine",
            ]
        ):
            score += 12

    # --------------------------------------------------------
    # Gynecology
    # --------------------------------------------------------

    gynecology_keywords = [
        "gynecology",
        "gynaecology",
        "gynecologist",
        "gynaecologist",
        "women doctor",
        "women's doctor",
        "obstetrician",
        "pregnancy doctor",
    ]

    if any(word in q for word in gynecology_keywords):

        if any(
            word in c
            for word in [
                "jeyapriya",
                "gynecology",
                "gynaecology",
                "obstetrics",
            ]
        ):
            score += 12

    # --------------------------------------------------------
    # Neurology
    # --------------------------------------------------------

    neurology_keywords = [
        "neurology",
        "neurologist",
        "neuro doctor",
        "neuro",
        "brain doctor",
    ]

    if any(word in q for word in neurology_keywords):

        if (
            "neurology" in c
            or "neurologist" in c
        ):
            score += 12

    # --------------------------------------------------------
    # Chief doctor
    # --------------------------------------------------------

    chief_keywords = [
        "chief doctor",
        "chief medical",
        "medical director",
        "director",
        "head doctor",
    ]

    if any(word in q for word in chief_keywords):

        if (
            "chief doctor" in c
            or "medical director" in c
        ):
            score += 15

    # --------------------------------------------------------
    # Diagnostic services
    # --------------------------------------------------------

    diagnostic_keywords = [
        "diagnostic",
        "scan",
        "test",
        "ct",
        "ct scan",
        "ultrasound",
        "doppler",
        "echo",
        "ecg",
        "xray",
        "x ray",
    ]

    if any(word in q for word in diagnostic_keywords):

        if (
            "diagnostic" in s
            or "diagnostic" in c
            or "04_diagnostic" in s
        ):
            score += 10

    # --------------------------------------------------------
    # Facilities
    # --------------------------------------------------------

    facility_keywords = [
        "facility",
        "facilities",
        "blood bank",
        "pharmacy",
        "laboratory",
        "lab",
    ]

    if any(word in q for word in facility_keywords):

        if (
            "facility" in s
            or "blood bank" in c
            or "pharmacy" in c
            or "laboratory" in c
        ):
            score += 10

    # --------------------------------------------------------
    # Emergency
    # --------------------------------------------------------

    emergency_keywords = [
        "emergency",
        "accident",
        "urgent",
        "ambulance",
        "emergency number",
    ]

    if any(word in q for word in emergency_keywords):

        if (
            "emergency" in c
            or "emergency" in s
        ):
            score += 15

    # --------------------------------------------------------
    # Contact
    # --------------------------------------------------------

    contact_keywords = [
        "phone",
        "telephone",
        "mobile",
        "contact",
        "address",
        "location",
        "where",
        "enga",
    ]

    if any(word in q for word in contact_keywords):

        if (
            "contact" in s
            or "hospital profile" in c
            or "address" in c
        ):
            score += 10

    # --------------------------------------------------------
    # Exact doctor names
    # --------------------------------------------------------

    names = [
        "vijayakumar",
        "renukadevi",
        "palaniappan",
        "jeyapriya",
    ]

    for name in names:

        if name in q and name in c:
            score += 20

    return score


# ============================================================
# GET / CREATE COLLECTION
# ============================================================

def get_collection():
    """
    Get the Chroma collection.

    If the collection does not exist, build it automatically.
    """

    try:

        collection = chroma_client.get_collection(
            name=COLLECTION_NAME
        )

        return collection

    except Exception:

        print(
            "Chroma collection does not exist."
        )

        print(
            "Building knowledge base..."
        )

        build_knowledge_base()

        return chroma_client.get_collection(
            name=COLLECTION_NAME
        )


# ============================================================
# BUILD KNOWLEDGE BASE
# ============================================================

def build_knowledge_base():
    """
    Completely rebuild the ChromaDB knowledge base
    from every .txt document.
    """

    print("")
    print("=" * 60)
    print("BUILDING SRI KUMARAN HOSPITAL KNOWLEDGE BASE")
    print("=" * 60)

    chunks = build_all_chunks()

    if not chunks:

        raise RuntimeError(
            "No knowledge chunks found. "
            "Please add .txt files to the documents folder."
        )

    # --------------------------------------------------------
    # Delete old collection
    # --------------------------------------------------------

    try:

        chroma_client.delete_collection(
            name=COLLECTION_NAME
        )

        print(
            "Old Chroma collection deleted."
        )

    except Exception:

        pass

    # --------------------------------------------------------
    # Create new collection
    # --------------------------------------------------------

    collection = chroma_client.create_collection(
        name=COLLECTION_NAME,
        metadata={
            "description":
                "Sri Kumaran Hospital Manapparai knowledge base"
        }
    )

    # --------------------------------------------------------
    # Prepare text
    # --------------------------------------------------------

    texts = [
        chunk["text"]
        for chunk in chunks
    ]

    print(
        f"Creating embeddings for {len(texts)} chunks..."
    )

    embeddings = embedding_model.encode(
        texts,
        show_progress_bar=True,
        normalize_embeddings=True
    )

    # --------------------------------------------------------
    # IDs
    # --------------------------------------------------------

    ids = []

    metadatas = []

    for index, chunk in enumerate(chunks):

        ids.append(
            f"hospital_chunk_{index}"
        )

        metadatas.append(
            {
                "source": chunk["source"],
                "chunk_index": index,
            }
        )

    # --------------------------------------------------------
    # Add to Chroma
    # --------------------------------------------------------

    collection.add(
        ids=ids,
        documents=texts,
        embeddings=embeddings.tolist(),
        metadatas=metadatas
    )

    print(
        f"Knowledge base created successfully."
    )

    print(
        f"Documents/chunks stored: {len(texts)}"
    )

    print("=" * 60)
    print("KNOWLEDGE BASE READY")
    print("=" * 60)
    print("")

    return collection


# ============================================================
# GREETING DETECTION
# ============================================================

def get_greeting_response(question: str) -> str | None:
    """
    Handle normal greetings without calling the LLM.

    This makes greetings instant.
    """

    q = normalize_text(question)

    # --------------------------------------------------------
    # Good morning
    # --------------------------------------------------------

    if (
        "good morning" in q
        or q in ["morning", "gm"]
    ):
        return (
            "Good morning! ☀️ "
            "Welcome to Sri Kumaran Hospital's AI Information "
            "Assistant. How can I help you today?"
        )

    # --------------------------------------------------------
    # Good afternoon
    # --------------------------------------------------------

    if (
        "good afternoon" in q
        or q in ["afternoon", "ga"]
    ):
        return (
            "Good afternoon! 🌤️ "
            "Welcome to Sri Kumaran Hospital's AI Information "
            "Assistant. How can I help you today?"
        )

    # --------------------------------------------------------
    # Good evening
    # --------------------------------------------------------

    if (
        "good evening" in q
        or q in ["evening", "ge"]
    ):
        return (
            "Good evening! 🌆 "
            "Welcome to Sri Kumaran Hospital's AI Information "
            "Assistant. How can I help you today?"
        )

    # --------------------------------------------------------
    # Good night
    # --------------------------------------------------------

    if (
        "good night" in q
        or q in ["night", "gn"]
    ):
        return (
            "Good night! 🌙 Take care. "
            "If you need Sri Kumaran Hospital information, "
            "feel free to ask."
        )

    # --------------------------------------------------------
    # Basic greetings
    # --------------------------------------------------------

    if q in [
        "hello",
        "hi",
        "hey",
        "hai",
        "hii",
        "helo",
        "hello there",
        "hi there",
    ]:
        return (
            "Hello! 👋 Welcome to Sri Kumaran Hospital's "
            "AI Information Assistant. "
            "How can I help you today?"
        )

    return None


# ============================================================
# SOCIAL / CONVERSATION RESPONSE
# ============================================================

def get_conversation_response(
    question: str
) -> str | None:

    q = normalize_text(question)

    # --------------------------------------------------------
    # Thank you
    # --------------------------------------------------------

    if q in [
        "thank you",
        "thanks",
        "thank u",
        "thanks a lot",
        "thankyou",
    ]:

        return (
            "You're welcome! 😊 "
            "I'm happy to help. "
            "If you need any more information about "
            "Sri Kumaran Hospital, just ask."
        )

    # --------------------------------------------------------
    # Bye
    # --------------------------------------------------------

    if q in [
        "bye",
        "goodbye",
        "see you",
        "see you later",
    ]:

        return (
            "Goodbye! 👋 Take care. "
            "For urgent medical assistance, please contact "
            "the hospital emergency numbers: "
            "9443900108 / 8270942108."
        )

    # --------------------------------------------------------
    # Who are you
    # --------------------------------------------------------

    if (
        "who are you" in q
        or "what are you" in q
    ):

        return (
            "I'm the Sri Kumaran Hospital AI Information "
            "Assistant. 🤖🏥\n\n"
            "I can help you with hospital doctors, departments, "
            "diagnostic services, facilities, contact details "
            "and publicly listed hospital information."
        )

    # --------------------------------------------------------
    # What can you do
    # --------------------------------------------------------

    if (
        "what can you do" in q
        or "how can you help" in q
    ):

        return (
            "I can help you with:\n\n"
            "• Doctors and specializations\n"
            "• Hospital departments\n"
            "• Diagnostic services\n"
            "• CT Scan, ECG, ECHO, X-Ray and Doppler\n"
            "• Laboratory, pharmacy and blood bank information\n"
            "• Surgical services\n"
            "• Hospital contact information\n"
            "• Emergency contact information"
        )

    # --------------------------------------------------------
    # How are you
    # --------------------------------------------------------

    if "how are you" in q:

        return (
            "I'm doing well, thank you! 😊 "
            "I'm ready to help you with Sri Kumaran Hospital "
            "information."
        )

    return None


# ============================================================
# DIRECT FAQ / KEYWORD ANSWERS
# ============================================================

def direct_answer(question: str) -> str | None:
    """
    Handle highly predictable questions directly.

    This improves speed and reliability for the client demo.
    """

    q = normalize_text(question)

    # ========================================================
    # CHIEF DOCTOR
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "chief doctor",
            "chief medical officer",
            "medical director",
            "head doctor",
        ]
    ):

        return (
            "I don't have a confirmed Chief Doctor, Chief Medical "
            "Officer or Medical Director name in my current "
            "hospital information.\n\n"
            "Please contact Sri Kumaran Hospital directly for "
            "the latest administrative details."
        )

    # ========================================================
    # NEUROLOGIST
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "who is the neurologist",
            "who is neurologist",
            "who is the neuro doctor",
            "neuro doctor yaaru",
            "neuro doctor",
            "neurologist name",
        ]
    ):

        return (
            "Neurology is listed as a specialty at Sri Kumaran "
            "Hospital, Manapparai. However, I don't have a "
            "confirmed Neurologist name in my current hospital "
            "information.\n\n"
            "Please contact the hospital directly for the latest "
            "Neurologist availability."
        )

    # ========================================================
    # ORTHOPEDIC DOCTOR
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "orthopedic doctor",
            "orthopaedic doctor",
            "ortho doctor",
            "bone doctor",
            "joint doctor",
            "spine doctor",
            "fracture doctor",
            "ortho surgeon",
        ]
    ):

        return (
            "The publicly listed orthopedic specialist associated "
            "with Sri Kumaran Hospital, Manapparai is:\n\n"
            "Dr. P. L. Vijayakumar\n"
            "• MBBS\n"
            "• MS\n"
            "• MCh (Ortho)\n\n"
            "Specialization: Orthopaedics / Orthopedic Surgery.\n\n"
            "Publicly listed related services include fracture "
            "surgery, spinal surgery, advanced joint replacement "
            "and minimally invasive knee surgery.\n\n"
            "For current doctor availability or appointment "
            "timings, please contact the hospital directly."
        )

    # ========================================================
    # PEDIATRIC DOCTOR
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "pediatric doctor",
            "paediatric doctor",
            "child doctor",
            "children doctor",
            "kids doctor",
            "pediatrician",
            "paediatrician",
            "child specialist",
        ]
    ):

        return (
            "The publicly listed pediatric specialist associated "
            "with Sri Kumaran Hospital, Manapparai is:\n\n"
            "Dr. C. Renukadevi\n"
            "• MBBS\n"
            "• MD (Paediatrics)\n\n"
            "Specialization: Paediatrics.\n\n"
            "For current availability and consultation timings, "
            "please contact the hospital directly."
        )

    # ========================================================
    # GENERAL MEDICINE
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "general medicine doctor",
            "general physician",
            "medicine doctor",
            "physician doctor",
        ]
    ):

        return (
            "The publicly listed doctor associated with general "
            "medicine at Sri Kumaran Hospital, Manapparai is:\n\n"
            "Dr. C. Palaniappan\n"
            "• MBBS\n"
            "• MD\n"
            "• C.Dials\n\n"
            "Publicly listed services include general medicine "
            "and cardiac-related medical services.\n\n"
            "I do not have confirmed information that he is a "
            "cardiologist. For current availability, please "
            "contact the hospital directly."
        )

    # ========================================================
    # GYNECOLOGY
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "gynecologist",
            "gynaecologist",
            "gynecology doctor",
            "gynaecology doctor",
            "women doctor",
            "women's doctor",
            "obstetrician",
        ]
    ):

        return (
            "The publicly listed doctor associated with "
            "gynaecology/obstetrics-related services is:\n\n"
            "Dr. M. Jeyapriya\n"
            "• MBBS\n"
            "• DGO\n\n"
            "For current consultation availability, please "
            "contact the hospital directly."
        )

    # ========================================================
    # BLOOD BANK
    # ========================================================

    if (
        "blood bank" in q
        or "bloodbank" in q
        or "blood bank iruka" in q
    ):

        return (
            "Yes. A 24-hour blood bank is publicly listed at "
            "Sri Kumaran Hospital, Manapparai.\n\n"
            "For real-time blood-group availability, please "
            "contact the hospital directly."
        )

    # ========================================================
    # PHARMACY
    # ========================================================

    if (
        "pharmacy" in q
        or "medical shop" in q
        or "medicine shop" in q
    ):

        return (
            "Yes. A 24-hour pharmacy is publicly listed at "
            "Sri Kumaran Hospital, Manapparai."
        )

    # ========================================================
    # CT SCAN
    # ========================================================

    if (
        "ct scan" in q
        or "ct available" in q
        or "ct iruka" in q
        or q == "ct"
    ):

        return (
            "Yes. Spiral CT Scan is publicly listed as a "
            "diagnostic service at Sri Kumaran Hospital, "
            "Manapparai."
        )

    # ========================================================
    # ULTRASOUND
    # ========================================================

    if (
        "ultrasound" in q
        or "ultra sound" in q
        or "usg" in q
    ):

        return (
            "Yes. Ultrasound is publicly listed as a diagnostic "
            "service at Sri Kumaran Hospital, Manapparai."
        )

    # ========================================================
    # DOPPLER
    # ========================================================

    if "doppler" in q:

        return (
            "Yes. Colour Doppler Scan is publicly listed as a "
            "diagnostic service at Sri Kumaran Hospital, "
            "Manapparai."
        )

    # ========================================================
    # ECG
    # ========================================================

    if (
        "ecg" in q
        or "electrocardiogram" in q
    ):

        return (
            "Yes. ECG is publicly listed as a diagnostic service "
            "at Sri Kumaran Hospital, Manapparai."
        )

    # ========================================================
    # ECHO
    # ========================================================

    if (
        q == "echo"
        or "echo scan" in q
        or "echocardiogram" in q
    ):

        return (
            "Yes. ECHO Scan is publicly listed as a diagnostic "
            "service at Sri Kumaran Hospital, Manapparai."
        )

    # ========================================================
    # X-RAY
    # ========================================================

    if (
        "x ray" in q
        or "xray" in q
    ):

        return (
            "Yes. A 300MA X-Ray service is publicly listed at "
            "Sri Kumaran Hospital, Manapparai."
        )

    # ========================================================
    # EMERGENCY NUMBER
    # ========================================================

    if (
        "emergency number" in q
        or "emergency contact" in q
        or "emergency phone" in q
        or "emergency number enna" in q
    ):

        return (
            "The publicly listed emergency numbers for "
            "Sri Kumaran Hospital, Manapparai are:\n\n"
            "📞 9443900108\n"
            "📞 8270942108"
        )

    # ========================================================
    # HOSPITAL PHONE
    # ========================================================

    if (
        "hospital phone" in q
        or "hospital number" in q
        or "phone number" in q
        or "contact number" in q
        or "contact details" in q
    ):

        return (
            "You can contact Sri Kumaran Hospital, Manapparai at:\n\n"
            "📞 04332 261444\n"
            "📞 04332 262445\n"
            "📱 7397391444"
        )

    # ========================================================
    # ADDRESS
    # ========================================================

    if any(
        phrase in q
        for phrase in [
            "hospital address",
            "hospital location",
            "where is the hospital",
            "where is sri kumaran",
            "hospital enga",
            "hospital enga irukku",
            "location",
        ]
    ):

        return (
            "Sri Kumaran Hospital is located at:\n\n"
            "50/9, Viralimalai Road,\n"
            "Manapparai,\n"
            "Tamil Nadu – 621306."
        )

    return None


# ============================================================
# RETRIEVE RELEVANT DOCUMENTS
# ============================================================

def retrieve_context(
    question: str,
    top_k: int = TOP_K
) -> Tuple[str, List[Dict]]:
    """
    Retrieve semantically relevant chunks from ChromaDB,
    then apply lightweight keyword boosting.
    """

    collection = get_collection()

    # --------------------------------------------------------
    # Create question embedding
    # --------------------------------------------------------

    question_embedding = embedding_model.encode(
        [question],
        normalize_embeddings=True
    )[0].tolist()

    # --------------------------------------------------------
    # Chroma semantic search
    # --------------------------------------------------------

    result = collection.query(
        query_embeddings=[
            question_embedding
        ],
        n_results=top_k
    )

    documents = result.get(
        "documents",
        [[]]
    )[0]

    metadatas = result.get(
        "metadatas",
        [[]]
    )[0]

    distances = result.get(
        "distances",
        [[]]
    )[0]

    retrieved = []

    for index, document in enumerate(documents):

        metadata = (
            metadatas[index]
            if index < len(metadatas)
            else {}
        )

        distance = (
            distances[index]
            if index < len(distances)
            else None
        )

        source = metadata.get(
            "source",
            "unknown"
        )

        keyword = keyword_score(
            question,
            document,
            source
        )

        retrieved.append(
            {
                "text": document,
                "source": source,
                "distance": distance,
                "keyword_score": keyword,
            }
        )

    # --------------------------------------------------------
    # Sort:
    #
    # semantic similarity first,
    # keyword relevance second
    # --------------------------------------------------------

    retrieved.sort(
        key=lambda item: (
            item["keyword_score"],
            -(item["distance"] or 0)
        ),
        reverse=True
    )

    # --------------------------------------------------------
    # Build context
    # --------------------------------------------------------

    context_parts = []

    total_chars = 0

    for item in retrieved:

        text = item["text"]

        if (
            total_chars + len(text)
            > MAX_CONTEXT_CHARS
        ):
            break

        context_parts.append(
            f"[Source: {item['source']}]\n{text}"
        )

        total_chars += len(text)

    context = "\n\n---\n\n".join(
        context_parts
    )

    return context, retrieved


# ============================================================
# ASK RAG
# ============================================================

def ask_rag(question: str) -> str:
    """
    Main RAG function.

    Flow:

        Greeting
            ↓
        Conversation
            ↓
        Direct FAQ
            ↓
        ChromaDB
            ↓
        Gemma 3:1B
    """

    if not question:

        return (
            "Please enter a question about "
            "Sri Kumaran Hospital."
        )

    question = question.strip()

    # ========================================================
    # 1. GREETING
    # ========================================================

    greeting = get_greeting_response(
        question
    )

    if greeting:

        return greeting

    # ========================================================
    # 2. CONVERSATION
    # ========================================================

    conversation = get_conversation_response(
        question
    )

    if conversation:

        return conversation

    # ========================================================
    # 3. DIRECT HIGH-CONFIDENCE ANSWERS
    # ========================================================

    direct = direct_answer(
        question
    )

    if direct:

        return direct

    # ========================================================
    # 4. RAG RETRIEVAL
    # ========================================================

    try:

        context, retrieved = retrieve_context(
            question
        )

    except Exception as error:

        print(
            f"Retrieval error: {error}"
        )

        return (
            "I'm currently unable to search the hospital "
            "information database. Please try again."
        )

    if not context:

        return (
            "I don't have that information in my current "
            "hospital database. Please contact Sri Kumaran "
            "Hospital directly for the latest details."
        )

    # ========================================================
    # 5. PROMPT
    # ========================================================

    system_prompt = """
You are the official-style information assistant for
Sri Kumaran Hospital, Manapparai.

Your job is to answer questions using ONLY the supplied
hospital knowledge context.

IMPORTANT RULES:

1. Never invent information.

2. Never invent doctors.

3. Never invent doctor qualifications.

4. Never invent doctor availability.

5. Never invent consultation timings.

6. Never invent consultation fees.

7. Never invent surgery costs.

8. Never invent diagnostic costs.

9. Never invent insurance eligibility.

10. Never invent a Chief Doctor.

11. Never invent a Neurologist.

12. Never confuse Sri Kumaran Hospital Manapparai with
other hospitals having the same or similar name.

13. If information is not present in the context, clearly say
that you do not have that information and advise the user to
contact the hospital.

14. For emergency situations, provide the publicly listed
emergency numbers when relevant:
9443900108
8270942108

15. You are an information assistant, NOT a doctor.

16. Do not diagnose diseases.

17. Do not prescribe medicines.

18. Do not recommend medication dosage.

19. Do not recommend surgery for an individual patient.

20. If the user asks a simple question, answer briefly.

21. If the user asks for details, provide a detailed answer.

22. Use bullet points for lists.

23. Be polite and professional.

24. You can understand English, Tamil and common Tanglish.

25. Do not mention ChromaDB, embeddings, RAG, vector database,
or internal system details to the user.

26. Do not say "according to the context" or "according to my
retrieved documents". Answer naturally.

27. If doctor information is publicly listed but current
availability is not confirmed, clearly distinguish the two.

28. If asked about the Chief Doctor, say that a confirmed Chief
Doctor name is not available.

29. If asked about a Neurologist and no confirmed name exists,
say that Neurology is listed but a specific Neurologist name
is not confirmed.

30. Prefer exact hospital information over general medical
knowledge.
"""

    user_prompt = f"""
HOSPITAL INFORMATION:

{context}

==================================================

USER QUESTION:

{question}

==================================================

INSTRUCTIONS:

Answer the user's question using only the hospital information
above.

Give the most relevant answer.

Do not include unrelated hospital information.

If the information is unavailable, say:

"I don't have that information in my current hospital database.
Please contact Sri Kumaran Hospital directly for the latest
details."

Answer naturally and professionally.
"""

    # ========================================================
    # 6. CALL OLLAMA
    # ========================================================

    try:

        response = ollama.chat(
            model=OLLAMA_MODEL,

            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],

            options={
                # Lower temperature = more factual
                "temperature": 0.1,

                # Keep answers reasonably short
                # This improves response speed.
                "num_predict": 180,

                # Context window
                "num_ctx": 4096,

                # Repetition control
                "repeat_penalty": 1.05,
            },

            # Keep Gemma loaded in memory.
            # This avoids repeatedly unloading/loading
            # the model between requests.
            keep_alive="10m",
        )

        answer = response[
            "message"
        ][
            "content"
        ].strip()

        if not answer:

            return (
                "I couldn't generate an answer right now. "
                "Please try again."
            )

        return answer

    except Exception as error:

        print(
            f"Ollama error: {error}"
        )

        return (
            "I'm currently unable to generate the hospital "
            "information response. Please make sure Ollama "
            "is running and the Gemma 3:1B model is available."
        )


# ============================================================
# OPTIONAL DEBUG FUNCTION
# ============================================================

def debug_search(question: str):
    """
    Useful for testing retrieval from PowerShell.

    Example:

        python -c "from app.rag_service import debug_search;
        debug_search('Who is the orthopedic doctor?')"
    """

    context, results = retrieve_context(
        question
    )

    print("")
    print("=" * 60)
    print("QUESTION")
    print("=" * 60)

    print(question)

    print("")
    print("=" * 60)
    print("RETRIEVED RESULTS")
    print("=" * 60)

    for index, result in enumerate(
        results,
        start=1
    ):

        print("")
        print(
            f"RESULT {index}"
        )

        print(
            f"Source: {result['source']}"
        )

        print(
            f"Distance: {result['distance']}"
        )

        print(
            f"Keyword score: "
            f"{result['keyword_score']}"
        )

        print(
            result["text"][:1000]
        )

    print("")
    print("=" * 60)
    print("CONTEXT SENT TO LLM")
    print("=" * 60)

    print(context)

    print("")