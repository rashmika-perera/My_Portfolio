import React, { useRef, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaCertificate, FaAward, FaTrophy } from "react-icons/fa";

import FrontEndPDF from "./assets/frontEnd.png";
import AdvancedReact from "./assets/advancedReact.png";
import Python from "./assets/googlePython.png";

// Sample certificate data
const certificates = [
  {
    id: "cert1",
    title: "Meta Front-End Developer",
    platform: "Coursera",
    date: "Dec 2023",
    file: FrontEndPDF,
    type: "image",
  },
  {
    id: "cert3",
    title: "Google Crash Course on Python",
    platform: "Coursera",
    date: "Dec 2023",
    file: Python,
    type: "image",
  },
  {
    id: "cert2",
    title: "Meta Advanced React",
    platform: "Coursera",
    date: "Dec 2023",
    file: AdvancedReact,
    type: "image",
  },
];

const CertificateTimeline = () => {
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [rotates, setRotates] = useState(certificates.map(() => ({ x: 0, y: 0 })));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsets = itemRefs.current.map((ref) => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();
        const middle = window.innerHeight / 2;
        return Math.abs(rect.top + rect.height / 2 - middle);
      });

      const minIndex = offsets.indexOf(Math.min(...offsets));
      setActiveIndex(minIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeCert = certificates[activeIndex];

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden mt-20"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#04AA6D] to-transparent rounded-full opacity-5 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-8 right-20 w-24 h-24 bg-gradient-to-l from-[#04AA6D] to-transparent rounded-full opacity-8 blur-2xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#04AA6D] rounded-full opacity-10"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-10 md:px-23 max-w-7xl mx-auto pb-8 relative z-10">
      {/* Left: Timeline */}
      <motion.div
        className="relative border-l-4 border-[#04AA6D] pl-6 space-y-12"
        variants={containerVariants}
      >
        {certificates.map((cert, index) => {
          const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = (e.clientY - centerY) / 15;
            const rotateY = (e.clientX - centerX) / 15;

            setRotates(prev => prev.map((r, i) => i === index ? { x: rotateY, y: -rotateX } : r));
          };

          const handleMouseLeave = () => {
            setRotates(prev => prev.map((r, i) => i === index ? { x: 0, y: 0 } : r));
          };

          return (
            <motion.div
              key={cert.id}
              ref={(el) => (itemRefs.current[index] = el)}
              className="relative group"
              variants={itemVariants}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              style={{
                rotateX: rotates[index].y,
                rotateY: rotates[index].x,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Timeline Glow Effect */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[#04AA6D] via-transparent to-[#04AA6D] rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"
                animate={{
                  opacity: hoveredIndex === index ? 0.2 : 0,
                }}
              />

              <div className="absolute -left-5 top-1 z-10">
                <motion.div
                  className="bg-[#04AA6D] text-white rounded-full p-2 shadow-md"
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  {index === 0 ? <FaAward /> : index === 1 ? <FaTrophy /> : <FaCertificate />}
                </motion.div>
              </div>

              <motion.div
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-5 shadow-2xl hover:shadow-[#04AA6D]/10 transition-all duration-500 relative z-10"
                whileHover={{
                  borderColor: "#04AA6D",
                  boxShadow: "0 25px 50px -12px rgba(4, 170, 109, 0.25)",
                }}
              >
                <motion.h3
                  className="text-lg sm:text-xl text-white font-semibold mb-2 group-hover:text-[#04AA6D] transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {cert.title}
                </motion.h3>
                <motion.p
                  className="text-gray-400 text-sm sm:text-base mb-1"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  {cert.platform}
                </motion.p>
                <motion.p
                  className="text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  {cert.date}
                </motion.p>
              </motion.div>

              {/* Show preview image below each item on mobile */}
              <motion.div
                className="mt-4 md:hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="bg-[#1a1a1a] border border-gray-800/50 p-1 shadow-lg w-full max-w-md mx-auto rounded-lg overflow-hidden">
                  <motion.img
                    src={cert.file}
                    alt={cert.title}
                    className="w-full max-h-[300px] object-contain transition-transform duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Right: Sticky Certificate Preview (Only on Desktop) */}
      <motion.div
        className="sticky top-28 mt-14 hidden md:block"
        initial={{ opacity: 0, x: 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 p-1 shadow-2xl w-full max-w-md mx-auto rounded-xl overflow-hidden hover:shadow-[#04AA6D]/10 transition-all duration-500"
          whileHover={{
            scale: 1.02,
            borderColor: "#04AA6D",
            boxShadow: "0 25px 50px -12px rgba(4, 170, 109, 0.25)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCert.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg overflow-hidden bg-black"
            >
              <motion.img
                src={activeCert.file}
                alt={activeCert.title}
                className="w-full max-h-[400px] object-contain transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Certificate Info Card */}
        <motion.div
          className="mt-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.h4
            className="text-white font-semibold text-lg mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {activeCert.title}
          </motion.h4>
          <motion.p
            className="text-gray-400 text-sm mb-1"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            {activeCert.platform}
          </motion.p>
          <motion.p
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Issued: {activeCert.date}
          </motion.p>
        </motion.div>
      </motion.div>
      </div>
    </motion.div>
  );
};export default CertificateTimeline;
