import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";

const About = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) / 5;
    const offsetY = (e.clientY - rect.top - rect.height / 2) / 5;
    setTranslate({ x: offsetX, y: offsetY });
  };

  const handleMouseLeave = () => {
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={containerRef}
      id="about"
      className="relative overflow-hidden"
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
      <div>
        <style>
          {`
      @keyframes dashGap {
        0% {
          transform: translateX(-10px);
        }
        100% {
          transform: translateX(550%);
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
        animation: dashGap 2s linear infinite;
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

        <motion.div
          className="flex flex-col items-center justify-center h-full text-white relative z-10"
          variants={itemVariants}
        >
          <motion.h1
            className="sm:text-sm md:text-lg mt-15 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get to know me
          </motion.h1>

          <div className="relative inline-block mb-27 mt-4 w-[300px] ">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              About Me
            </motion.h1>

            <div className="flex justify-center">
              <div className="base-line">
                <div className="gap-strip">
                  <div className="gap"></div>
                  <div className="gap"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center h-full text-white gap-10 relative z-10"
        variants={itemVariants}
      >
        <motion.div
          className="relative group"
        >
          <motion.img
            src={"/perera.webp"}
            alt="Profile"
            className="relative border border-gray-900 rounded-2xl h-103 w-80 sm:h-113 sm:w-80 md:h-133 md:w-100 mb-4 shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="flex flex-col md:w-1/2 md:gap-4 w-3/4"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h1
            className="text-lg md:text-2xl text-[#04AA6D] font-semibold w-1/2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ scale: 1.02 }}
          >
            Who am i?
          </motion.h1>
          <motion.h1
            className="text-xl sm:text-2xl md:text-3xl font-bold leading-[1.5]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            I'm Rashmika Perera, a passionate Full Stack developer and designer
          </motion.h1>
          <motion.p
            className="text-sm md:text-[16px] text-gray-400 leading-[1.6] mt-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            I'm Rashmika Perera, a 21-year-old Software Engineering
            undergraduate at the National Institute of Business Management. With
            a keen interest in technology and innovation, I am dedicated to
            developing software solutions that address real-world challenges.
            Through continuous self-learning and hands-on projects, I strive to
            improve my skills and stay ahead in the ever-evolving tech
            landscape. My passion for problem-solving drives me to explore new
            opportunities and contribute to meaningful advancements in software
            development
          </motion.p>
          <motion.hr
            className="border-t-2 border-gray-700 md:w-158 mt-4"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
          <motion.div
            className="flex flex-row items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            <motion.button
              className="bg-[#04AA6D] text-white w-37 h-12 rounded-[50px] font-semibold mt-6 transition-all duration-300 hover:bg-[#038f5c] hover:shadow-lg hover:shadow-[#04AA6D]/25"
              onClick={() =>
                window.open(
                  "https://drive.google.com/file/d/1oSonkvXrRHHHBJ3HXSkNy5O5hVYYCxZv/view?usp=sharing",
                  "_blank"
                )
              }
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px)`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
            <div className="hidden md:flex items-center">
              <motion.hr
                className="border-t-2 border-gray-700 w-20 ml-7 mr-7 mt-6"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
              />
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 2.0 }}
              >
                <FaGithub
                  className="text-2xl mt-5 text-gray-400 hover:text-[#04AA6D] transition duration-300 ease-in-out cursor-pointer hover:scale-110"
                  onClick={() => window.open("https://github.com/Rashmika20041")}
                />
                <FaLinkedin
                  className="text-2xl mt-5 text-gray-400 hover:text-[#04AA6D] transition duration-300 ease-in-out cursor-pointer hover:scale-110"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/rashmika-perera-b49142291/"
                    )
                  }
                />
                <SiGmail
                  className="text-2xl mt-5 text-gray-400 hover:text-[#04AA6D] transition duration-300 ease-in-out cursor-pointer hover:scale-110"
                  onClick={() =>
                    window.open(
                      "mailto:rashmikaperera330@gmail.com?subject=Hello&body=I%20saw%20your%20portfolio"
                    )
                  }
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
