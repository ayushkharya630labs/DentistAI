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
        <button className="bg-primary hover:scale-105 transition px-8 py-3 rounded-xl font-semibold shadow-lg">
          Analyze My Teeth
        </button>
      </Link>

      <p className="text-xs text-gray-500 mt-8">
        ⚠️ Not a medical diagnosis
      </p>
    </div>
  );
}
