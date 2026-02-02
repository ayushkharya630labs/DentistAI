import { useState } from "react";
import axios from "axios";
import UploadBox from "../components/UploadBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function Analyze() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    const form = new FormData();
    form.append("image", file);
    form.append("text", text);

    setLoading(true);

    const res = await axios.post("http://localhost:3000/api/analyze", form);

    navigate("/result", { state: res.data });
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">

      <UploadBox setFile={setFile} />

      <textarea
        placeholder="Describe your pain..."
        className="w-full p-4 bg-glass rounded-xl border border-white/10"
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-primary px-6 py-3 rounded-xl font-semibold w-full"
      >
        {loading ? <LoadingSpinner /> : "Analyze"}
      </button>
    </div>
  );
}
