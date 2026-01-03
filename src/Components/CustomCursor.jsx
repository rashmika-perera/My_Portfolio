import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 600, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    // Use a MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
        const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
        interactiveElements.forEach(el => {
            // Remove old listeners to avoid duplicates (though addEventListener handles this usually)
            el.removeEventListener('mouseenter', handleMouseEnter);
            el.removeEventListener('mouseleave', handleMouseLeave);
            
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial attach
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <div className="relative">
        {/* Core Glow */}
        <motion.div
          className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-[#04AA6D] via-[#00ff88] to-[#04AA6D] rounded-full blur-md"
          animate={{
            scale: cursorVariant === "hover" ? [1, 1.5, 1] : [1, 1.2, 1],
            opacity: cursorVariant === "hover" ? [0.6, 0.9, 0.6] : [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Main Cursor Body */}
        <motion.div
          className="relative w-10 h-10 bg-gradient-to-br from-[#04AA6D] to-[#00ff88] rounded-full flex items-center justify-center shadow-lg"
          animate={{
            rotate: cursorVariant === "hover" ? [0, 180, 360] : [0, 90, 0],
            scale: cursorVariant === "hover" ? [1, 1.1, 1] : [1, 1.05, 1],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Inner Design */}
          <motion.div
            className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
            animate={{
              scale: cursorVariant === "hover" ? [1, 0.8, 1] : [1, 0.9, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div
              className="w-2 h-2 bg-[#04AA6D] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
          </motion.div>
        </motion.div>

        {/* Orbiting Rings */}
        <motion.div
          className="absolute inset-0 border-2 border-[#04AA6D]/60 rounded-full"
          animate={{
            rotate: cursorVariant === "hover" ? [0, 360] : [0, 180, 0],
            scale: cursorVariant === "hover" ? [1, 1.3, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 2 : 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 border border-[#00ff88]/40 rounded-full"
          animate={{
            rotate: cursorVariant === "hover" ? [360, 0] : [180, 0, 180],
            scale: cursorVariant === "hover" ? [1.2, 1.5, 1.2] : [1.1, 1.3, 1.1],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 3 : 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#04AA6D] rounded-full"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: cursorVariant === "hover"
                ? [0, Math.cos(i * 60 * Math.PI / 180) * 25, 0]
                : [0, Math.cos(i * 60 * Math.PI / 180) * 15, 0],
              y: cursorVariant === "hover"
                ? [0, Math.sin(i * 60 * Math.PI / 180) * 25, 0]
                : [0, Math.sin(i * 60 * Math.PI / 180) * 15, 0],
              opacity: cursorVariant === "hover" ? [0.8, 0.4, 0.8] : [0.6, 0.2, 0.6],
              scale: cursorVariant === "hover" ? [1, 1.5, 1] : [1, 0.5, 1],
            }}
            transition={{
              duration: cursorVariant === "hover" ? 1.5 : 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            rotate: cursorVariant === "hover" ? [0, 360] : [0, 180, 0],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 4 : 6,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            className="w-3 h-3 border border-[#00ff88] transform rotate-45"
            animate={{
              scale: cursorVariant === "hover" ? [0.8, 1.2, 0.8] : [0.9, 1.1, 0.9],
              opacity: cursorVariant === "hover" ? [0.6, 1, 0.6] : [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Energy Waves */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#04AA6D]/30"
          animate={{
            scale: cursorVariant === "hover" ? [1, 2, 1] : [1, 1.5, 1],
            opacity: cursorVariant === "hover" ? [0.5, 0, 0.5] : [0.3, 0, 0.3],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 1 : 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-[#00ff88]/20"
          animate={{
            scale: cursorVariant === "hover" ? [1.2, 2.5, 1.2] : [1.1, 1.8, 1.1],
            opacity: cursorVariant === "hover" ? [0.3, 0, 0.3] : [0.2, 0, 0.2],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 1.5 : 2.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.3
          }}
        />

        {/* Magnetic Field Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-radial from-[#04AA6D]/10 to-transparent"
          animate={{
            scale: cursorVariant === "hover" ? [1, 1.8, 1] : [1, 1.3, 1],
            opacity: cursorVariant === "hover" ? [0.4, 0.1, 0.4] : [0.2, 0.05, 0.2],
          }}
          transition={{
            duration: cursorVariant === "hover" ? 2 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
};

export default CustomCursor;
