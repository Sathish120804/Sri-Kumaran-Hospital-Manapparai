import { useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Departments from "./pages/Departments";
import Doctors from "./pages/Doctors";
import DoctorDetails from "./pages/DoctorDetails";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

/* =========================================================
   HOSPITAL AI CHATBOT
========================================================= */

function HospitalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  /*
    RAG API

    PC IP:
    192.168.1.6

    FastAPI:
    http://192.168.1.6:8000

    Endpoint:
    /api/chat
  */
  const RAG_API_URL = "http://10.222.60.157:8000/api/chat";

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I’m the Sri Kumaran Hospital AI Assistant.\n\nHow can I help you?",
    },
  ]);

  /* =========================================================
     AUTO SCROLL
  ========================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  const sendMessage = async (customQuestion = null) => {
    const trimmedQuestion = (
      customQuestion !== null ? customQuestion : question
    ).trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    /* Add user message */
    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(RAG_API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            data.answer ||
            "Sorry, I couldn't find an answer from the hospital information.",
        },
      ]);
    } catch (error) {
      console.error("RAG API Error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm unable to connect to the hospital assistant right now.\n\nPlease check whether the RAG server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     ENTER KEY
  ========================================================= */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  /* =========================================================
     QUICK QUESTION
  ========================================================= */

  const askQuickQuestion = (text) => {
    sendMessage(text);
  };

  /* =========================================================
     CHATBOT UI
  ========================================================= */

  return (
    <>
      {/* =====================================================
          FLOATING CHAT BUTTON
      ===================================================== */}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            border: "none",
            background: "#0d6efd",
            color: "white",
            fontSize: "28px",
            cursor: "pointer",
            boxShadow: "0 5px 20px rgba(0,0,0,0.25)",
            zIndex: 9999,
          }}
          aria-label="Open Hospital AI Assistant"
        >
          💬
        </button>
      )}

      {/* =====================================================
          CHAT WINDOW
      ===================================================== */}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            right: "25px",
            bottom: "25px",
            width: "370px",
            maxWidth: "calc(100vw - 30px)",
            height: "550px",
            maxHeight: "calc(100vh - 40px)",
            background: "#ffffff",
            borderRadius: "18px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid #e5e7eb",
          }}
        >
          {/* =================================================
              HEADER
          ================================================== */}

          <div
            style={{
              background:
                "linear-gradient(135deg, #0d6efd, #0b5ed7)",
              color: "white",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                🏥 Sri Kumaran Hospital
              </div>

              <div
                style={{
                  fontSize: "12px",
                  opacity: 0.9,
                  marginTop: "3px",
                }}
              >
                AI Information Assistant
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                color: "white",
                fontSize: "22px",
                cursor: "pointer",
              }}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          {/* =================================================
              MESSAGES
          ================================================== */}

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
              background: "#f8fafc",
            }}
          >
            {messages.map((message, index) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isUser
                      ? "flex-end"
                      : "flex-start",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "11px 14px",
                      borderRadius: isUser
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                      background: isUser
                        ? "#0d6efd"
                        : "#ffffff",
                      color: isUser
                        ? "#ffffff"
                        : "#1f2937",
                      boxShadow:
                        "0 1px 4px rgba(0,0,0,0.08)",
                      fontSize: "14px",
                      lineHeight: "1.5",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}

            {/* =================================================
                LOADING
            ================================================== */}

            {loading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    padding: "11px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    fontSize: "14px",
                    color: "#64748b",
                    boxShadow:
                      "0 1px 4px rgba(0,0,0,0.08)",
                  }}
                >
                  Thinking... 🤔
                </div>
              </div>
            )}

            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* =================================================
              QUICK QUESTIONS
          ================================================== */}

          <div
            style={{
              padding: "8px 10px",
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              background: "#ffffff",
              borderTop: "1px solid #eee",
            }}
          >
            <button
              onClick={() =>
                askQuickQuestion(
                  "What departments are available?"
                )
              }
              disabled={loading}
              style={{
                whiteSpace: "nowrap",
                border: "1px solid #dbeafe",
                background: loading ? "#f1f5f9" : "#eff6ff",
                color: "#1d4ed8",
                padding: "7px 10px",
                borderRadius: "20px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "11px",
              }}
            >
              Departments
            </button>

            <button
              onClick={() =>
                askQuickQuestion(
                  "What diagnostic services are available?"
                )
              }
              disabled={loading}
              style={{
                whiteSpace: "nowrap",
                border: "1px solid #dbeafe",
                background: loading ? "#f1f5f9" : "#eff6ff",
                color: "#1d4ed8",
                padding: "7px 10px",
                borderRadius: "20px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "11px",
              }}
            >
              Services
            </button>

            <button
              onClick={() =>
                askQuickQuestion(
                  "Does the hospital have a blood bank?"
                )
              }
              disabled={loading}
              style={{
                whiteSpace: "nowrap",
                border: "1px solid #dbeafe",
                background: loading ? "#f1f5f9" : "#eff6ff",
                color: "#1d4ed8",
                padding: "7px 10px",
                borderRadius: "20px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "11px",
              }}
            >
              Facilities
            </button>

            <button
              onClick={() =>
                askQuickQuestion(
                  "Who are the doctors available at Sri Kumaran Hospital?"
                )
              }
              disabled={loading}
              style={{
                whiteSpace: "nowrap",
                border: "1px solid #dbeafe",
                background: loading ? "#f1f5f9" : "#eff6ff",
                color: "#1d4ed8",
                padding: "7px 10px",
                borderRadius: "20px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "11px",
              }}
            >
              Doctors
            </button>
          </div>

          {/* =================================================
              INPUT
          ================================================== */}

          <div
            style={{
              padding: "12px",
              background: "#ffffff",
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask about the hospital..."
              disabled={loading}
              style={{
                flex: 1,
                border: "1px solid #d1d5db",
                borderRadius: "12px",
                padding: "11px 12px",
                outline: "none",
                fontSize: "14px",
              }}
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading || !question.trim()}
              style={{
                width: "48px",
                border: "none",
                borderRadius: "12px",
                background:
                  loading || !question.trim()
                    ? "#94a3b8"
                    : "#0d6efd",
                color: "white",
                cursor:
                  loading || !question.trim()
                    ? "not-allowed"
                    : "pointer",
                fontSize: "18px",
              }}
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* =========================================================
   MAIN APPLICATION
========================================================= */

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/doctors"
          element={<Doctors />}
        />

        <Route
          path="/doctors/:id"
          element={<DoctorDetails />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Routes>

      {/* Hospital AI Chatbot */}
      <HospitalChatbot />
    </MainLayout>
  );
}

export default App;