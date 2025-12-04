import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [count, setCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  const paths = [
    "M 20 50 L 50 20 L 80 50 L 50 80 Z", // Diamond
    "M 20 20 L 80 20 L 80 80 L 20 80 Z", // Square
    "M 50 20 L 80 80 L 20 80 Z", // Triangle
    "M 50 50 m -30, 0 a 30,30 0 1,0 60,0 a 30,30 0 1,0 -60,0", // Circle
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        clearInterval(interval);
        setShowWelcome(true);
        return 100;
      });
    }, 20); // Controls the speed of the counter

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut", delay: 1.2 },
    },
  };

  const preloaderContentVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -50,
      transition: { duration: 0.6, ease: "anticipate" },
    },
  };

  const welcomeVariants = {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: "circOut" },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-[#0a0a0a] z-50 flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <AnimatePresence>
        {!showWelcome ? (
          <motion.div
            key="preloader"
            variants={preloaderContentVariants}
            exit="exit"
            className="flex flex-col items-center justify-center gap-4"
          >
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              className="drop-shadow-[0_0_8px_rgba(4,170,109,0.5)]"
            >
              <motion.path
                d={paths[Math.floor(count / 25) % paths.length]}
                fill="none"
                stroke="#04AA6D"
                strokeWidth="3"
              />
            </motion.svg>
            <div className="text-white text-6xl font-mono font-bold flex items-center">
              <span className="text-[#04AA6D]">{count}</span>
              <span className="text-2xl">%</span>
            </div>
            <p className="text-gray-400 text-lg tracking-widest">LOADING...</p>
          </motion.div>
        ) : (
          <motion.div
            key="welcome"
            variants={welcomeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Preloader;
