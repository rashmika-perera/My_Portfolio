// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import project from "./project";
import { FaCode, FaRocket } from "react-icons/fa";

const Card = ({ i, title, description, image, tech, link, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="min-h-screen flex items-center justify-center sticky top-0 px-4 py-8 mt-15"
    >
      <motion.div
        style={{
          scale,
          top: `calc(${i * 35}px)`,
        }}
        className="relative w-full max-w-4xl h-auto min-h-[400px] md:h-[500px] bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <div className="w-full md:w-3/5 h-48 md:h-full relative overflow-hidden">
          <motion.img
            style={{ scale: imageScale }}
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900 to-transparent" />
        </div>

        <div className="w-full md:w-2/5 p-4 md:p-6 flex flex-col justify-between min-h-[250px] md:min-h-0">
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-[#04AA6D] transition-colors duration-300 leading-tight">
                {title}
              </h3>
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 md:gap-1.5 mb-4 md:mb-6">
              {tech.map((t, index) => (
                <motion.span
                  key={index}
                  className="inline-flex items-center gap-1.5 bg-gray-700 text-[#04AA6D] text-xs md:text-xs px-3 py-1.5 md:px-2 md:py-1 rounded-full border border-[#04AA6D]"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#04AA6D",
                    color: "white",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <FaCode className="text-xs" />
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => window.open(link, "_blank")}
            className="w-full bg-[#04AA6D] text-black py-3 md:py-2.5 px-6 md:px-4 rounded-xl font-bold text-sm md:text-xs transition-all duration-300 hover:bg-[#038f5c] flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Launch Project</span>
            <FaRocket className="text-sm md:text-xs" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div id="Devfolio" ref={containerRef} className="relative">
      <style>
        {`
        @keyframes dashGap {
          0% { transform: translateX(-10px); }
          100% { transform: translateX(800%); }
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
        `}
      </style>

      {/* Section Header */}
      <div className="text-center pt-8 md:pt-10 pb-8 md:pb-0 relative z-10">
        <div className="flex flex-col items-center justify-center text-white">
          <h1 className="text-sm md:text-lg text-gray-400">My Creative Journey</h1>
          <div className="relative inline-block mt-2 md:mt-4 w-[280px] md:w-[600px]">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Creative <span className="text-[#04AA6D]">Projects</span>
            </h1>
            <div className="flex justify-center">
              <div className="base-line">
                <div className="gap-strip">
                  <div className="gap" /> <div className="gap" /> <div className="gap" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        {project.map((proj, index) => {
          const targetScale = 1 - (project.length - index) * 0.05;
          return (
            <Card
              key={`p_${index}`}
              i={index}
              {...proj}
              progress={scrollYProgress}
              range={[index * (1 / project.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
      <div className="h-[10vh] md:h-[5vh]" />
    </div>
  );
};

export default Projects;
