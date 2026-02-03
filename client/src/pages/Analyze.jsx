import { useState } from "react";
import UploadBox from "../components/UploadBox";
import LoadingSpinner from "../components/LoadingSpinner";
import { analyzeDentalImage } from "../api/dentistApi";
import { useNavigate } from "react-router-dom";

export default function Analyze() {
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submit = async () => {
        if (!file || !text) return alert("Upload image + describe pain");

        setLoading(true);

        try {
            const res = await analyzeDentalImage(file, text);
            navigate("/result", { state: res });
        } catch (err) {
            alert("Error analyzing image");
        }

        setLoading(false);
    };

    return (
        <div className="space-y-6 max-w-xl mx-auto p-6">

            <UploadBox setFile={setFile} file={file} />

            <textarea
                placeholder="Describe your pain..."
                className="w-full p-4 bg-glass rounded-xl border border-white/10 text-white resize-none h-28 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={submit} className="relative inline-flex h-12 overflow-hidden rounded p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    {loading ? <LoadingSpinner /> : "Analyze Dental Image"}
                </span>
            </button>
        </div>
    );
}
