import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { IoClose } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSnowHat, setShowSnowHat] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);


  // Check if it's winter season (November, December, January)
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // 0-11
    const isWinter = currentMonth === 10 || currentMonth === 11 || currentMonth === 0; // Nov, Dec, Jan
    setShowSnowHat(isWinter);
  }, []);

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto px-5 py-4 z-50 bg-black/30 backdrop-blur-md border border-white/10 rounded-full flex justify-between items-center shadow-xl"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
    >
      <div className="container relative mx-auto flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold select-none">
          Portfolio.
        </h1>
        {showSnowHat && (
          <img
            src="/hat.webp"
            alt="hat"
            className="absolute -top-3 -left-5 w-10 rotate-[-20deg] select-none"
          />
        )}
        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 text-xl font-semibold mr-8">
          {["about", "toolbox", "Devfolio", "Recognitions", "contact"].map(
            (item, i) => (
              <li key={i}>
                <Link
                  to={item}
                  smooth={true}
                  duration={800}
                  offset={item === "about" ? 20 : -80}
                  className="text-white hover:text-[#04AA6D] cursor-pointer select-none"
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
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-[#111] p-8 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <ul className="flex flex-col mt-10 space-y-6 text-white text-lg font-semibold">
          <IoClose
            className="sm:right-8 right-9 top-9 text-3xl absolute cursor-pointer"
            onClick={closeMenu}
          />
          {["about", "toolbox", "Devfolio", "Recognitions", "contact"].map(
            (item, i) => (
              <li key={i}>
                <Link
                  to={item}
                  smooth={true}
                  duration={800}
                  offset={item === "about" ? 20 : -80}
                  onClick={closeMenu}
                  className="hover:text-[#04AA6D] cursor-pointer select-none"
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
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
