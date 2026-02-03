import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.data) {
    return (
      <div className="text-center text-gray-400 mt-20">
        No result found
      </div>
    );
  }

  const { findings, imageUrl } = state.data; 

  return (
    <div className="space-y-6 max-w-xl mx-auto p-6">

      {/* Image preview */}
      {imageUrl && (
        <div className="bg-glass p-4 rounded-xl border border-white/10">
          <h3 className="font-bold mb-2 text-white">Uploaded Image</h3>
          <img
            src={imageUrl}
            alt="Dental upload"
            className="rounded-xl w-full object-cover"
          />
        </div>
      )}

      {/* AI Findings */}
      <div className="bg-glass p-6 rounded-xl border border-white/10">
        <h3 className="font-bold mb-3 text-white">AI Findings</h3>

        <div className="text-gray-300 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto pr-2">
          {findings}
        </div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        ⚠️ This is not a medical diagnosis. Always consult a professional dentist.
      </p>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl border border-white/10 transition"
      >
        Analyze Another Image
      </button>
    </div>
  );
}
