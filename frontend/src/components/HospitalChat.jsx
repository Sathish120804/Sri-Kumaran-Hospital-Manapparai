import { useEffect, useRef, useState } from "react";
import axios from "axios";

// Set VITE_RAG_API_URL in your frontend .env file if your API uses another address.
// Example: VITE_RAG_API_URL=http://10.222.60.157:8000/api/chat
const API_URL = import.meta.env.VITE_RAG_API_URL || "http://localhost:8000/api/chat";

const QUICK_QUESTIONS = [
  "Who are the doctors?",
  "What diagnostic services are available?",
  "What is the hospital address?",
  "How can I contact the hospital?",
];

const initialMessage = {
  role: "assistant",
  content:
    "Hello! 👋 Welcome to Sri Kumaran Hospital, Manapparai. I can help with information about doctors, departments, diagnostic services, facilities, and contact details. What would you like to know?",
};

export default function HospitalChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([initialMessage]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const messageEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const askQuestion = async (questionText = question) => {
    const userQuestion = questionText.trim();
    if (!userQuestion || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", content: userQuestion },
    ]);
    setQuestion("");
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        API_URL,
        { question: userQuestion },
        { timeout: 120000, headers: { "Content-Type": "application/json" } }
      );

      const answer = response?.data?.answer;
      if (typeof answer !== "string" || !answer.trim()) {
        throw new Error("The API returned an empty answer.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: answer.trim() },
      ]);
    } catch (error) {
      console.error("Hospital chat request failed:", error);
      const detail =
        error.code === "ECONNABORTED"
          ? "The response is taking longer than expected. Please try again."
          : "I couldn't connect to the hospital assistant. Please check that the RAG API is running and try again.";
      setErrorMessage(detail);
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: "Sorry, I couldn't get an answer right now. Please try again in a moment.",
          failed: true,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    if (loading) return;
    setMessages([initialMessage]);
    setErrorMessage("");
    setQuestion("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      askQuestion();
    }
  };

  return (
    <main className="hospital-chat-page">
      <style>{`
        .hospital-chat-page {
          min-height: 100vh; padding: 28px 16px; box-sizing: border-box;
          display: flex; align-items: center; justify-content: center;
          background: radial-gradient(circle at top left, #e7f5ff 0, transparent 38%),
                      linear-gradient(135deg, #f5f9ff 0%, #f7fbf9 100%);
          color: #172b4d; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .hospital-chat-shell { width: 100%; max-width: 820px; height: min(760px, calc(100vh - 56px)); min-height: 520px;
          display: flex; flex-direction: column; overflow: hidden; background: #fff; border: 1px solid #e2eaf2;
          border-radius: 24px; box-shadow: 0 24px 70px rgba(26, 62, 99, .13); }
        .hospital-chat-header { display: flex; align-items: center; gap: 14px; padding: 20px 24px;
          background: linear-gradient(120deg, #075985, #0f766e); color: #fff; }
        .hospital-chat-logo { width: 48px; height: 48px; flex: 0 0 48px; display: grid; place-items: center;
          border-radius: 16px; background: rgba(255,255,255,.16); font-size: 25px; }
        .hospital-chat-heading { flex: 1; min-width: 0; }
        .hospital-chat-heading h1 { margin: 0; font-size: 18px; line-height: 1.35; font-weight: 750; }
        .hospital-chat-heading p { margin: 4px 0 0; font-size: 12px; color: #d7f3f1; }
        .hospital-chat-status { display: inline-flex; align-items: center; gap: 6px; margin-top: 7px; font-size: 11px; color: #e0fff3; }
        .hospital-chat-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #6ee7b7; box-shadow: 0 0 0 3px rgba(110,231,183,.18); }
        .hospital-chat-clear { border: 1px solid rgba(255,255,255,.35); border-radius: 10px; padding: 8px 11px; color: #fff;
          background: rgba(255,255,255,.1); cursor: pointer; font-size: 12px; }
        .hospital-chat-clear:hover { background: rgba(255,255,255,.2); }
        .hospital-chat-messages { flex: 1; overflow-y: auto; padding: 24px; background: #fbfdff; }
        .hospital-chat-row { display: flex; align-items: flex-end; gap: 10px; margin-bottom: 20px; animation: chatFadeIn .22s ease-out; }
        .hospital-chat-row.user { justify-content: flex-end; }
        .hospital-chat-avatar { width: 32px; height: 32px; flex: 0 0 32px; display: grid; place-items: center; border-radius: 11px;
          background: #e0f2fe; font-size: 16px; }
        .hospital-chat-avatar.user-avatar { background: #d1fae5; }
        .hospital-chat-message-wrap { max-width: min(78%, 570px); }
        .hospital-chat-sender { margin: 0 0 5px 3px; font-size: 11px; font-weight: 700; color: #718096; }
        .hospital-chat-row.user .hospital-chat-sender { text-align: right; margin-right: 3px; }
        .hospital-chat-bubble { padding: 12px 15px; border: 1px solid #e5edf5; border-radius: 4px 17px 17px 17px;
          background: #fff; color: #26374d; font-size: 14px; line-height: 1.65; white-space: pre-wrap; overflow-wrap: anywhere;
          box-shadow: 0 3px 10px rgba(25, 55, 85, .035); }
        .hospital-chat-row.user .hospital-chat-bubble { border-color: #0f766e; border-radius: 17px 4px 17px 17px; background: #0f766e; color: #fff; }
        .hospital-chat-bubble.failed { border-color: #fecaca; background: #fff7f7; color: #991b1b; }
        .hospital-chat-typing { display: flex; gap: 5px; align-items: center; min-height: 22px; }
        .hospital-chat-typing span { width: 7px; height: 7px; border-radius: 50%; background: #0f766e; animation: typingBounce 1s infinite ease-in-out; }
        .hospital-chat-typing span:nth-child(2) { animation-delay: .15s; }
        .hospital-chat-typing span:nth-child(3) { animation-delay: .3s; }
        .hospital-chat-suggestions { padding: 0 24px 16px; display: flex; flex-wrap: wrap; gap: 8px; background: #fbfdff; }
        .hospital-chat-suggestion { border: 1px solid #d9e7f0; border-radius: 999px; background: #fff; color: #24536c; padding: 8px 12px;
          font-size: 12px; cursor: pointer; transition: .15s ease; }
        .hospital-chat-suggestion:hover { border-color: #0f766e; background: #f0fdfa; }
        .hospital-chat-composer { padding: 16px 20px 18px; border-top: 1px solid #e7eef5; background: #fff; }
        .hospital-chat-input-row { display: flex; align-items: center; gap: 10px; padding: 7px; border: 1px solid #d9e4ed;
          border-radius: 16px; background: #fff; transition: border-color .15s, box-shadow .15s; }
        .hospital-chat-input-row:focus-within { border-color: #0f9b8e; box-shadow: 0 0 0 3px rgba(15,118,110,.09); }
        .hospital-chat-input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; color: #172b4d; padding: 9px 10px;
          font: inherit; font-size: 14px; }
        .hospital-chat-input::placeholder { color: #91a1b4; }
        .hospital-chat-send { min-width: 86px; border: 0; border-radius: 11px; padding: 11px 15px; background: #0f766e; color: white;
          font-weight: 700; cursor: pointer; transition: background .15s; }
        .hospital-chat-send:hover:not(:disabled) { background: #115e59; }
        .hospital-chat-send:disabled { opacity: .5; cursor: not-allowed; }
        .hospital-chat-help { display: flex; justify-content: space-between; gap: 12px; margin: 9px 3px 0; color: #8492a6; font-size: 10px; }
        .hospital-chat-error { color: #b91c1c; font-size: 12px; margin: 8px 3px 0; }
        @keyframes typingBounce { 0%, 60%, 100% { transform: translateY(0); opacity: .55; } 30% { transform: translateY(-5px); opacity: 1; } }
        @keyframes chatFadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) {
          .hospital-chat-page { padding: 0; min-height: 100dvh; }
          .hospital-chat-shell { height: 100dvh; min-height: 0; border-radius: 0; border: 0; }
          .hospital-chat-header { padding: 16px; gap: 10px; }
          .hospital-chat-logo { width: 42px; height: 42px; flex-basis: 42px; border-radius: 13px; }
          .hospital-chat-heading h1 { font-size: 15px; }
          .hospital-chat-clear { padding: 7px 8px; }
          .hospital-chat-messages { padding: 18px 13px; }
          .hospital-chat-message-wrap { max-width: 86%; }
          .hospital-chat-suggestions { padding: 0 13px 13px; }
          .hospital-chat-composer { padding: 12px; }
          .hospital-chat-send { min-width: 66px; padding: 11px 10px; }
          .hospital-chat-help { font-size: 9px; }
        }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; scroll-behavior: auto !important; } }
      `}</style>

      <section className="hospital-chat-shell" aria-label="Sri Kumaran Hospital chat assistant">
        <header className="hospital-chat-header">
          <div className="hospital-chat-logo" aria-hidden="true">🏥</div>
          <div className="hospital-chat-heading">
            <h1>Sri Kumaran Hospital</h1>
            <p>Manapparai · AI Information Assistant</p>
            <div className="hospital-chat-status"><span className="hospital-chat-status-dot" /> Ask about hospital information</div>
          </div>
          <button className="hospital-chat-clear" type="button" onClick={clearChat} disabled={loading}>
            Clear chat
          </button>
        </header>

        <div className="hospital-chat-messages" aria-live="polite" aria-label="Chat messages">
          {messages.map((message, index) => (
            <div className={`hospital-chat-row ${message.role === "user" ? "user" : "assistant"}`} key={`${index}-${message.role}`}>
              {message.role === "assistant" && <div className="hospital-chat-avatar" aria-hidden="true">🏥</div>}
              <div className="hospital-chat-message-wrap">
                <p className="hospital-chat-sender">{message.role === "user" ? "You" : "Hospital Assistant"}</p>
                <div className={`hospital-chat-bubble ${message.failed ? "failed" : ""}`}>{message.content}</div>
              </div>
              {message.role === "user" && <div className="hospital-chat-avatar user-avatar" aria-hidden="true">👤</div>}
            </div>
          ))}

          {loading && (
            <div className="hospital-chat-row assistant" role="status" aria-label="Assistant is typing">
              <div className="hospital-chat-avatar" aria-hidden="true">🏥</div>
              <div className="hospital-chat-message-wrap">
                <p className="hospital-chat-sender">Hospital Assistant</p>
                <div className="hospital-chat-bubble hospital-chat-typing"><span /><span /><span /></div>
              </div>
            </div>
          )}
          <div ref={messageEndRef} />
        </div>

        {!loading && messages.length <= 1 && (
          <div className="hospital-chat-suggestions" aria-label="Suggested questions">
            {QUICK_QUESTIONS.map((item) => (
              <button className="hospital-chat-suggestion" type="button" key={item} onClick={() => askQuestion(item)}>
                {item}
              </button>
            ))}
          </div>
        )}

        <form className="hospital-chat-composer" onSubmit={(event) => { event.preventDefault(); askQuestion(); }}>
          <div className="hospital-chat-input-row">
            <input
              ref={inputRef}
              className="hospital-chat-input"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about doctors, services, contact details..."
              aria-label="Ask a question about Sri Kumaran Hospital"
              autoComplete="off"
              disabled={loading}
            />
            <button className="hospital-chat-send" type="submit" disabled={!question.trim() || loading}>
              {loading ? "Sending…" : "Send ↗"}
            </button>
          </div>
          {errorMessage && <p className="hospital-chat-error" role="alert">{errorMessage}</p>}
          <div className="hospital-chat-help">
            <span>Enter to send · Shift + Enter for a new line</span>
            <span>For emergencies, call the hospital directly.</span>
          </div>
        </form>
      </section>
    </main>
  );
}
