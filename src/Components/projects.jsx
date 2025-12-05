// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useInView } from "framer-motion";
import { useRef, useState } from "react";
import project from "./project";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket } from "react-icons/fa";

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotates, setRotates] = useState({});
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      id="Devfolio"
      className="py-10 relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <style>
        {`
        @keyframes dashGap {
          0% {
            transform: translateX(-10px);
          }
          100% {
            transform: translateX(800%);
          }
        }

        .base-line {
          position: absolute;
          bottom: -40px;
          width: 30%;
          height: 4px;
          background-color: #04AA6D;
          overflow: hidden;
        }

        .gap-strip {
          display: flex;
          gap: 5px;
          animation: dashGap 4s linear infinite;
          position: absolute;
          height: 4px;
        }

        .gap {
          width: 5px;
          height: 4px;
          background-color: black;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for project cards */
        .project-card::-webkit-scrollbar {
          width: 4px;
        }

        .project-card::-webkit-scrollbar-track {
          background: transparent;
        }

        .project-card::-webkit-scrollbar-thumb {
          background: #04AA6D;
          border-radius: 2px;
        }

        .project-card::-webkit-scrollbar-thumb:hover {
          background: #038f5c;
        }
        `}
      </style>
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
          className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-l from-[#04AA6D] to-transparent rounded-full opacity-8 blur-2xl"
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

      {/* Section Header */}
      <motion.div
        className="text-center mb-16 relative z-10"
        variants={cardVariants}
      >
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h1 className="sm:text-sm md:text-lg text-gray-400">
            My Creative Journey
          </h1>

          <div className="relative inline-block mb-24 mt-4 w-[400px] md:w-[600px]">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Creative <span className="text-[#04AA6D]">Projects</span>
            </h1>

            <div className="flex justify-center">
              <div className="base-line">
                <div className="gap-strip">
                  <div className="gap"></div>
                  <div className="gap"></div>
                  <div className="gap"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
      >
        {project.map((proj, index) => {

          const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = (e.clientY - centerY) / 10;
            const rotateY = (e.clientX - centerX) / 10;

            setRotates(prev => ({ ...prev, [index]: { x: rotateY, y: -rotateX } }));
          };

          const handleMouseLeave = () => {
            setRotates(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
          };

          return (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              style={{
                rotateX: rotates[index]?.y || 0,
                rotateY: rotates[index]?.x || 0,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#04AA6D] via-transparent to-[#04AA6D] rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                animate={{
                  opacity: hoveredIndex === index ? 0.3 : 0,
                }}
              />

              {/* Main Card */}
              <motion.div
                className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#04AA6D]/10 transition-all duration-500"
                whileHover={{
                  borderColor: "#04AA6D",
                  boxShadow: "0 25px 50px -12px rgba(4, 170, 109, 0.25)",
                }}
              >
                {/* Project Image Container */}
                <motion.div
                  className="relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                  {/* Floating Tech Badges */}
                  <motion.div
                    className="absolute top-4 left-4 flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    {proj.tech.slice(0, 2).map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "#04AA6D",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Hover Actions */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                  >
                    <motion.button
                      onClick={() => window.open(proj.link, "_blank")}
                      className="bg-white/10 backdrop-blur-sm hover:bg-[#04AA6D] text-white p-2 rounded-full transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </motion.button>
                    <motion.button
                      onClick={() => window.open(`https://github.com/Rashmika20041?tab=repositories`, "_blank")}
                      className="bg-white/10 backdrop-blur-sm hover:bg-[#04AA6D] text-white p-2 rounded-full transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="text-sm" />
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Card Content */}
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <motion.h3
                    className="text-xl font-bold text-white mb-3 group-hover:text-[#04AA6D] transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {proj.title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    {proj.description}
                  </motion.p>

                  {/* Tech Stack */}
                  <motion.div
                    className="flex flex-wrap gap-2 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    {proj.tech.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        className="inline-flex items-center gap-1 bg-[#04AA6D]/10 text-[#04AA6D] text-xs px-3 py-1 rounded-full border border-[#04AA6D]/20"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#04AA6D",
                          color: "white",
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <FaCode className="text-xs" />
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Action Button */}
                  <motion.button
                    onClick={() => window.open(proj.link, "_blank")}
                    className="w-full bg-gradient-to-r from-[#04AA6D] to-[#038f5c] hover:from-[#038f5c] hover:to-[#04AA6D] text-white py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#04AA6D]/25 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  >
                    <span>View Project</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
