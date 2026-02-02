import { Link } from "react-router-dom";
import { Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <header className="bg-glass backdrop-blur-lg border-b border-white/10">
            <Link to='/'>
                <div className="container mx-auto px-6 py-4 flex items-center gap-3">
                    <motion.div
                        initial={{ rotate: -10 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Smile className="text-primary" size={28} />
                    </motion.div>

                    <h1 className="text-xl font-bold tracking-wide">
                        DentistAI
                    </h1>
                </div>
            </Link>
        </header>
    );
}
