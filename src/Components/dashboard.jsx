import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import bg from "/hero.webp";
import bg2 from "./assets/background2.webp";
import NavigationBar from "./navigationbar";
import About from "./about";
import Skills from "./skills";
import Project from "./projects.jsx";
import Footer from "./footer";
import Social from "./social";
import Recognitions from "./recognitions";
import Contact from "./contact";
import Preloader from "./Preloader";
import { Typewriter } from "react-simple-typewriter";
import { FaArrowUp } from "react-icons/fa";
import Snowfall from "react-snowfall";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSnow, setShowSnow] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Check if it's winter season (November, December, January)
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // 0-11
    if(currentMonth === 10 || currentMonth === 0) {
      setShowSnow("normal");
    }
    else if(currentMonth === 11) {
      setShowSnow("heavy");
    }
    else{
      setShowSnow(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>
        {`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        `}
      </style>
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      {/* Snowfall Effect */}
      {showSnow === "normal" && (
        <Snowfall
          color="white"
          snowflakeCount={50}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 10,
            pointerEvents: 'none'
          }}
          speed={[0.5, 2.0]}
          wind={[-0.5, 1.0]}
          radius={[0.5, 3.0]}
        />
      )}

      {showSnow === "heavy" && (
        <Snowfall
          color="white"
          snowflakeCount={130}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 10,
            pointerEvents: 'none'
          }}
          speed={[1.0, 3.0]}
          wind={[-1.0, 2.0]}
          radius={[1.0, 4.0]}
        />
      )}

      {!isLoading && (
        <>
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[#04AA6D] transform-origin-left z-50"
            style={{ scaleX }}
          />

          <div
            className="bg-cover bg-center h-screen md:bg-fixed relative overflow-hidden"
            style={{ backgroundImage: `url(${bg})` }}
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

            <NavigationBar />
            <div className="flex flex-col justify-center text-center h-screen items-center relative z-10">
              <motion.h1
                className="text-white text-6xl sm:text-8xl md:text-7xl font-bold mt-[-150px] mb-10 select-none"
                style={{ fontFamily: "'Poppins', sans-serif" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Rashmika Perera
              </motion.h1>

              <motion.h2
                className="text-white text-2xl sm:text-5xl md:text-4xl font-semibold mb-5 select-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                I'm a{" "}
                <span
                  style={{
                    color: "#04AA6D",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  <Typewriter
                    words={[
                      "Software Engineer",
                      "Full Stack Developer",
                      "Mobile Developer",
                      "Creative Thinker",
                      "Designer",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Social />
              </motion.div>
            </div>
          </div>

          <div
            className="bg-fixed bg-cover bg-center min-h-screen relative"
            style={{ backgroundImage: `url(${bg2})` }}
          >
            <About />
            <Skills />
            <Project />
            <Recognitions />
            <Contact />
          </div>
          <Footer />

          {/* Back to Top Button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-[#04AA6D] hover:bg-[#038f5c] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowUp className="text-xl" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Creative Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 20,
          mass: 0.3,
          velocity: 0
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
    </>
  );
};

export default Dashboard;
