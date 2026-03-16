import React from "react";
import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-[#0a0a0a] z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* CSS-only Loader */}
        <div className="w-16 h-16 border-4 border-[#04AA6D]/20 border-t-[#04AA6D] rounded-full animate-spin shadow-[0_0_15px_rgba(4,170,109,0.3)]"></div>
        
        <div className="flex flex-col items-center">
          <p className="text-white text-2xl font-mono font-bold tracking-[0.2em] animate-pulse">
            LOADING
          </p>
          <div className="w-48 h-1 bg-gray-800 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-[#04AA6D] animate-progress-loading shadow-[0_0_10px_rgba(4,170,109,0.5)]"></div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes progress-loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
          .animate-progress-loading {
            animation: progress-loading 1.2s ease-in-out infinite;
          }
        `}
      </style>
    </motion.div>
  );
};

export default Preloader;
