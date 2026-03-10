import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Extremely low-overhead spring config for snappy feels without continuous overshooting
  const springConfig = { damping: 40, stiffness: 800, mass: 0.05 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by half of cursor width/height to center
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      // Event delegation prevents needing a MutationObserver (huge performance saver)
      if (e.target.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select')) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, [role="button"], .cursor-pointer, input, textarea, select')) {
        setIsHovered(false);
      }
    };

    // Use passive listeners to avoid blocking the main thread (fixes scroll/movement lag)
    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:flex items-center justify-center w-8 h-8"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        willChange: "transform",
      }}
    >
      {/* Outer Ring with Glow Filter */}
      <motion.div
        className="absolute rounded-full border-2 border-[#04AA6D] shadow-[0_0_8px_rgba(4,170,109,0.5)]"
        animate={{
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? "rgba(4,170,109,0.15)" : "rgba(4,170,109,0)",
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="w-2 h-2 bg-[#00ff88] rounded-full shadow-[0_0_5px_rgba(0,255,136,0.8)]"
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default CustomCursor;
