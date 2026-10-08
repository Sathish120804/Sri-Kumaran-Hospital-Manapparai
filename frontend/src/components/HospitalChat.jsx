import { useState } from "react";
import axios from "axios";

export default function HospitalChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.1.6:8000/api/chat",
        {
          question: userQuestion,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, the hospital assistant is currently unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h2>🤖 Sri Kumaran Hospital Assistant</h2>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          minHeight: "300px",
          marginBottom: "15px",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <strong>
              {message.role === "user"
                ? "You"
                : "Hospital Assistant"}
              :
            </strong>

            <div>{message.content}</div>
          </div>
        ))}

        {loading && <div>Assistant is thinking...</div>}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          placeholder="Ask about Sri Kumaran Hospital..."
          style={{
            flex: 1,
            padding: "12px",
          }}
        />

        <button onClick={askQuestion}>
          Ask
        </button>
      </div>
    </div>
  );
}