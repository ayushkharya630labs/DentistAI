import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { continueConsult, closeConsult } from "../api/dentistApi";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>No consultation found</div>;

  const [messages, setMessages] = useState([
    { role: "ai", text: state.reply },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [closed, setClosed] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input || closed) return;

    try {
      setLoading(true);

      const userMsg = { role: "user", text: input };
      setMessages((m) => [...m, userMsg]);

      const res = await continueConsult(state.sessionId, input);

      const aiMsg = { role: "ai", text: res.reply };
      setMessages((m) => [...m, aiMsg]);

      setInput("");
    } catch (err) {
      console.error(err);
      alert("Chat error");
    }

    setLoading(false);
  };

  const handleClose = async () => {
    try {
      await closeConsult(state.sessionId);

      setClosed(true);

      alert("Session closed");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to close session");
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col max-w-3xl mx-auto p-4">

      {/* Header */}
      <div className="bg-glass rounded-xl p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4 flex-shrink-0">
          <img
            src={state.imageUrl}
            className="w-16 h-16 object-cover rounded-lg border border-white/10"
          />
          <div>
            <h2 className="text-white font-semibold">DentistAI Session</h2>
            <p className="text-xs text-gray-400">
              This is not a medical diagnosis
            </p>
          </div>
        </div>

        {/* Close button */}
        <div className="text-center flex-shrink-0">
          <button
            onClick={handleClose}
            className="mt-3 rounded-md bg-red-600 py-2 px-4 text-sm text-white hover:bg-red-700"
          >
            Close session
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-4 bg-glass rounded-xl p-4">

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm">
                🦷
              </div>
            )}

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-purple-600 text-white rounded-br-sm"
                  : "bg-black/40 text-gray-200 rounded-bl-sm"
              }`}
            >
              {m.text}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                👤
              </div>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="mt-4 flex gap-2 flex-shrink-0">

        <input
          value={input}
          disabled={closed}
          onChange={(e) => setInput(e.target.value)}
          placeholder={closed ? "Session closed" : "Type your reply..."}
          className="flex-1 p-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={send}
          disabled={closed}
          className="relative inline-flex h-12 overflow-hidden rounded p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {loading ? "..." : "Send"}
          </span>
        </button>
      </div>

    </div>
  );
}
