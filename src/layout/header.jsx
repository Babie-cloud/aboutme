import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calcul du regard (biais gauche comme l'original)
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;
  const normX = mounted ? mousePos.x / width : 0.3;
  const normY = mounted ? mousePos.y / height : 0.5;
  const eyeX = (normX - 0.35) * 24; 
  const eyeY = (normY - 0.5) * 14;

  const location = useLocation();
  const isHome = location.pathname === "/";
  const anchor = (hash) => (isHome ? hash : `/#${hash.replace("#", "")}`);

  // Header toujours sombre (en light mode tout le reste est clair, pas le header)
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[60] px-6 py-5 flex justify-between items-center border-b border-white/10 bg-[#0a0a0a]/95 text-white backdrop-blur-md"
    >
      <div className="flex items-center gap-6">
        <div className="relative">
          <svg
            className="absolute -inset-4 w-24 h-20 pointer-events-none opacity-30"
            viewBox="0 0 96 72"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            strokeLinecap="round"
          >
            <path d="M12 36 Q48 8 84 36 Q48 64 12 36" />
            <path d="M20 28 L28 20 M48 14 L48 18 M68 20 L76 28" />
          </svg>
          <div className="relative w-20 h-12 border-2 border-white rounded-[50%] overflow-hidden bg-gray-900 shadow-[inset_2px_2px_8px_rgba(255,255,255,0.08)]">
            <motion.div
              animate={{ x: eyeX, y: eyeY }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white"
            >
              <div className="w-2 h-2 rounded-full absolute top-1 right-1 bg-gray-800 opacity-90" />
            </motion.div>
          </div>
        </div>
        <Link
          to="/"
          className="font-serif italic text-2xl tracking-tighter text-white hover:text-red-400 transition-colors"
        >
          K.
        </Link>
      </div>
      <nav className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium">
        <a href={anchor("#sketches")} className="text-white/90 hover:text-red-400 transition-colors">Carnet</a>
        <a href={anchor("#theater")} className="text-white/90 hover:text-red-400 transition-colors">Théâtre</a>
        <a href={anchor("#about")} className="text-white/60 hover:text-red-400 transition-colors">À propos</a>
        <a href={anchor("#contact")} className="text-white/60 hover:text-red-400 transition-colors">Contact</a>
      </nav>
    </motion.header>
  );
}