import React, { useState, useEffect, lazy, Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import bg from "/hero.webp";
import bg2 from "./assets/background2.webp";
import NavigationBar from "./navigationbar";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import { Typewriter } from "react-simple-typewriter";
import { FaArrowUp } from "react-icons/fa";
import Snowfall from "react-snowfall";

// Lazy load sections for better initial performance
const About = lazy(() => import("./about"));
const Skills = lazy(() => import("./skills"));
const Project = lazy(() => import("./projects.jsx"));
const Recognitions = lazy(() => import("./recognitions"));
const Contact = lazy(() => import("./contact"));
const Footer = lazy(() => import("./footer"));
const Social = lazy(() => import("./social"));

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSnow, setShowSnow] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Check if the page is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      const handleLoad = () => setIsLoading(false);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
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
      <CustomCursor />
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      {/* Snowfall Effect */}
      {showSnow === "normal" && (
        <Snowfall
          color="white"
          snowflakeCount={30}
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
          snowflakeCount={80}
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
            <Suspense fallback={<div className="h-screen flex items-center justify-center text-white">Loading...</div>}>
              <About />
              <Skills />
              <Project />
              <Recognitions />
              <Contact />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {/* Back to Top Button */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={scrollToTop}
                className="fixed top-6 right-8 bg-[#04AA6D] hover:bg-[#038f5c] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowUp className="text-xl" />
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Dashboard;
