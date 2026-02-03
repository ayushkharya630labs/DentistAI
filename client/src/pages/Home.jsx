import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="text-center space-y-8">

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold"
            >
                AI Dental Insights
            </motion.h2>

            <p className="text-gray-400 max-w-xl mx-auto">
                Upload a dental photo and describe your symptoms.
                Get safe, AI-powered insights before visiting a dentist.
            </p>

            <Link to="/analyze">
                <button className="relative inline-flex h-12 overflow-hidden rounded p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Analyze My Teeth
                    </span>
                </button>
            </Link>

            <p className="text-xs text-gray-500 mt-8">
                ⚠️ Not a medical diagnosis
            </p>
        </div>
    );
}
