import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSnowHat, setShowSnowHat] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);


  // Check if it's winter season (November, December, January)
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // 0-11
    const isWinter = currentMonth === 10 || currentMonth === 11 || currentMonth === 0; // Nov, Dec, Jan
    setShowSnowHat(isWinter);

    // Handle scroll for navigation bar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto px-5 py-1 z-50 transition-all duration-300 rounded-full flex justify-between items-center ${
        isScrolled 
          ? "bg-black/20 backdrop-blur-md border border-white/10 shadow-xl" 
          : "bg-black/20 backdrop-blur-xs border border-white/10 shadow-xl"
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8 }}
    >
      <div className="container mx-auto flex justify-between items-center relative h-12 md:h-16">
        <h1 className="text-white text-3xl md:text-4xl font-bold select-none transition-colors">
          Portfolio.
        </h1>
        {showSnowHat && (
          <img
            src="/hat.webp"
            alt="hat"
            className="absolute -top-3 -left-5 w-10 rotate-[-20deg] select-none"
          />
        )}
        {/* Desktop Nav - Links Capsule (With Border) */}
        <ul className="hidden md:flex space-x-3 items-center transition-all duration-300 rounded-full px-4 py-2 ">
          {["about", "toolbox", "Devfolio", "Recognitions", "contact"].map(
            (item, i) => (
              <li key={i}>
                <Link
                  to={item}
                  smooth={true}
                  duration={800}
                  offset={item === "about" ? 20 : -80}
                  className="text-white text-xl font-medium px-4 py-2 hover:text-[#04AA6D] rounded-full transition-all cursor-pointer select-none"
                >
                  {item === "about"
                    ? "Behind The Code"
                    : item === "toolbox"
                      ? "Toolbox"
                      : item === "Devfolio"
                        ? "Devfolio"
                        : item === "Recognitions"
                          ? "Recognitions"
                          : "Contact"}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
           <Menu size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Floating Creative Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-screen z-[100] md:hidden bg-black/90 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              onClick={closeMenu}
              className="absolute top-10 right-10 text-white bg-white/10 p-3 rounded-full hover:bg-[#04AA6D] transition-colors"
              aria-label="Close menu"
            >
              <IoClose size={30} />
            </motion.button>

            <ul className="flex flex-col space-y-4 w-full max-w-sm">
              {["about", "toolbox", "Devfolio", "Recognitions", "contact"].map(
                (item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, rotateY: 45 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ delay: i * 0.1, type: "spring", damping: 15 }}
                  >
                    <Link
                      to={item}
                      smooth={true}
                      duration={800}
                      offset={item === "about" ? 20 : -80}
                      onClick={closeMenu}
                      className="group relative overflow-hidden bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <span className="text-white text-2xl font-bold group-hover:text-[#04AA6D] transition-colors">
                        {item === "about"
                          ? "Behind The Code"
                          : item === "toolbox"
                            ? "Toolbox"
                            : item === "Devfolio"
                              ? "Devfolio"
                              : item === "Recognitions"
                                ? "Recognitions"
                                : "Contact"}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#04AA6D] transition-colors">
                        <div className="w-2 h-2 rounded-full bg-white group-hover:bg-[#04AA6D] transition-colors" />
                      </div>
                      
                      {/* Decorative Background Glow */}
                      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#04AA6D]/5 blur-2xl group-hover:bg-[#04AA6D]/20 transition-all" />
                    </Link>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NavigationBar;
