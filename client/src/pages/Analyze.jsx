import { useState } from "react";
import { startConsult } from "../api/dentistApi";
import { useNavigate } from "react-router-dom";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!file || !text) return alert("Upload image + describe pain");

    try {
      setLoading(true);
      const res = await startConsult(file, text);
      navigate("/result", { state: res });
    } catch (err) {
      console.error(err);
      alert("Error starting consultation");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center ">

      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">

        <h1 className="text-2xl font-bold text-white text-center">
          🦷 DentistAI Consultation
        </h1>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-xl p-6 cursor-pointer hover:border-purple-400 transition">

          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          ) : (
            <div className="text-center text-gray-400 space-y-2">
              <p className="text-lg">Upload dental image</p>
              <p className="text-sm">Drag & drop or click to select</p>
            </div>
          )}

          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* Textarea */}
        <textarea
          placeholder="Describe your symptoms or pain..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none h-28"
        />

        {/* Button — unchanged style */}
        <button
          onClick={submit}
          className="relative inline-flex h-12 overflow-hidden rounded p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            {loading ? "Thinking..." : "Start Consultation"}
          </span>
        </button>

        <p className="text-xs text-gray-500 text-center">
          ⚠️ This is not a medical diagnosis
        </p>

      </div>
    </div>
  );
}
