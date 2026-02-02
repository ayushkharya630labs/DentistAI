import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();

  if (!state) return <p>No result</p>;

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <div className="bg-glass p-6 rounded-xl border border-white/10">
        <h3 className="font-bold mb-2">AI Findings</h3>
        <p className="text-gray-300 whitespace-pre-line">
          {state.data.findings}
        </p>
      </div>

      <p className="text-xs text-gray-500">
        ⚠️ Not a medical diagnosis
      </p>

    </div>
  );
}
