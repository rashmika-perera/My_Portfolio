import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, useInView } from "framer-motion";
import tailwind from "./assets/Tailwind CSS.png";
import python from "./assets/Python.png";
import CSharp from "./assets/CSharp.png";
import { GrMysql } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";
import { SiSpring } from "react-icons/si";
import {
  FaReact,
  FaGithub,
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaJava,
  FaNodeJs,
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const skills = [
  {
    name: "React",
    icon: <FaReact className="text-cyan-400 text-3xl md:text-7xl" />,
    description:
      "I am proficient in React, a powerful JavaScript library for building dynamic and responsive user interfaces. I create reusable components and manage state efficiently to build scalable web applications. With React’s virtual DOM, I optimize rendering performance and deliver smooth user experiences. I also integrate React with modern tools like hooks, context API, and third-party libraries to enhance functionality. My experience includes building single-page applications, handling routing, and connecting front-end with APIs for seamless data flow",
  },
  {
    name: "Tailwind CSS",
    icon: (
      <img
        src={tailwind}
        alt="Tailwind CSS"
        className="w-10 h-10 md:w-20 md:h-20 object-contain"
      />
    ),
    description:
      "I am skilled in Tailwind CSS, a utility-first framework that helps me build fast, responsive, and modern user interfaces. Using Tailwind’s ready-made utility classes, I create clean designs without writing much custom CSS. I efficiently handle responsive layouts, spacing, and styling variations for different screen sizes. I also integrate Tailwind with React to develop interactive, visually appealing web apps. My experience includes customizing Tailwind’s config and building reusable components for maintainable project",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-green-500 text-3xl md:text-7xl" />,
    description:
      "I am proficient in Node.js, a powerful JavaScript runtime built on Chrome's V8 JavaScript engine. I use Node.js to build scalable network applications and server-side solutions. My experience includes working with Express.js for web frameworks, handling asynchronous operations, and integrating with databases. Node.js enables me to create efficient, high-performance applications using JavaScript on both client and server sides.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-cyan-400 text-3xl md:text-7xl" />,
    description:
      "I am proficient in TypeScript, a superset of JavaScript that adds static types to the language. I use TypeScript to build robust, maintainable applications by catching errors at compile time and improving code quality. My experience includes working with TypeScript in React projects, leveraging its features like interfaces, generics, and type inference to create scalable components. TypeScript enhances my development workflow by providing better tooling, autocompletion, and documentation, making it easier to collaborate with teams and manage large codebases",
  },
  {
    name: "JAVA",
    icon: <FaJava className="text-orange-500 text-3xl md:text-7xl" />,
    description:
      "I am skilled in Java, a versatile and widely-used programming language known for its portability and robustness. I use Java to build reliable, high-performance applications ranging from desktop software to web backends. My experience includes object-oriented programming principles, exception handling, and working with Java frameworks like Spring Boot. I am comfortable with writing clean, maintainable code and implementing data structures and algorithms. Additionally, I integrate Java applications with databases to create efficient, scalable solutions",
  },
  {
    name: "Git & GitHub",
    icon: <FaGithub className="text-gray-200 text-3xl md:text-7xl" />,
    description:
      "I am proficient in Git and GitHub, essential tools for version control and collaborative software development. Using Git, I efficiently track changes, manage branches, and resolve conflicts in codebases. I leverage GitHub for hosting repositories, collaborating with teams through pull requests, code reviews, and issue tracking. These tools enable me to maintain clean, organized project histories, streamline workflows, and contribute to open-source projects. My experience ensures smooth collaboration and reliable code management throughout development cycles",
  },
  {
    name: "Python",
    icon: (
      <img src={python} alt="Python" className="w-10 h-10 md:w-20 md:h-20 object-contain" />
    ),
    description:
      "I am proficient in Python, a versatile and powerful programming language widely used for web development, data analysis, automation, and more. I write clean, efficient code using Python’s simple syntax and vast standard library. My experience includes working with popular frameworks like Django and Flask for building web applications, as well as using libraries for data manipulation and visualization. Python’s flexibility and readability help me quickly prototype solutions and develop scalable, maintainable software",
  },
  {
    name: "C#",
    icon: <img src={CSharp} alt="C#" className="w-10 h-10 md:w-20 md:h-20 object-contain" />,
    description:
      "I am skilled in C#, a modern, object-oriented programming language used primarily for building Windows applications, web services, and game development. I utilize C# with the .NET framework to create robust and scalable applications. My experience includes working with features like LINQ, asynchronous programming, and strong type safety. I’m comfortable building user interfaces with Windows Forms or WPF and developing backend APIs using ASP.NET Core. C# enables me to deliver efficient, maintainable, and high-performance software solutions",
  },
  {
    name: "MySQL",
    icon: <GrMysql className="text-[#F29111] w-8 h-8 md:w-20 md:h-20" />,
    description:
      "I am proficient in MySQL, a widely-used relational database management system. I design and manage databases, write complex queries, and optimize performance for efficient data storage and retrieval. My experience includes creating tables, establishing relationships, and implementing indexing strategies to enhance query speed. I also handle data integrity through constraints and transactions. MySQL’s scalability and reliability make it a key component in building robust applications that require structured data management",
  },
  {
    name: "Firebase",
    icon: <IoLogoFirebase className="text-[#FF7B00] w-8 h-8 md:w-20 md:h-20" />,
    description:
      "I am proficient in Firebase, a comprehensive app development platform that provides a variety of tools and services to help developers build high-quality applications. I utilize Firebase for real-time database management, user authentication, and hosting. My experience includes integrating Firebase with front-end frameworks like React to create dynamic, data-driven applications. Firebase's serverless architecture allows me to focus on building features without worrying about infrastructure management, enabling rapid development and deployment",
  },
];

export default function SkillsCarousel() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [rotates, setRotates] = useState({});
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev + 1) % skills.length);
  };

  const handlePrev = () => {
    setCenterIndex((prev) => (prev - 1 + skills.length) % skills.length);
  };

  const leftIndex = (centerIndex - 1 + skills.length) % skills.length;
  const rightIndex = (centerIndex + 1) % skills.length;

  return (
    <motion.div
      ref={containerRef}
      className="text-white text-center relative overflow-hidden py-10"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-20 w-24 h-24 bg-gradient-to-r from-[#04AA6D] to-transparent rounded-full opacity-5 blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-32 h-32 bg-gradient-to-l from-[#04AA6D] to-transparent rounded-full opacity-8 blur-3xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#04AA6D] rounded-full opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      <style>
        {`
    @keyframes rotateOutline {
      0% {
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.99);
      }
      33% {
        box-shadow: 0 0 0 2px rgba(0, 255, 0, 0.99);
      }
      66% {
        box-shadow: 0 0 0 2px rgba(0, 0, 255, 0.99);
      }
      100% {
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.99);
      }
    }

    .rgb-outline {
      animation: rotateOutline 2s linear infinite;
     }
    `}
      </style>
      <style>
        {`
        @keyframes rgbTextColor {
        0%   { color: rgb(255, 0, 0); }     /* Red */
        33%  { color: rgb(0, 255, 0); }     /* Green */
        66%  { color: rgb(0, 0, 255); }     /* Blue */
        100% { color: rgb(255, 0, 0); }     /* Red */
        }

        .rgb-text {
         animation: rgbTextColor 3s linear infinite;
        }
     `}
      </style>

      <motion.div
        className="flex justify-center items-center space-x-3 md:space-x-8 relative z-10"
        variants={itemVariants}
      >
        {/* Left Arrow */}
        <motion.button
          onClick={handlePrev}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:bg-[#04AA6D]/20 hover:border-[#04AA6D] p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#04AA6D]/20"
          whileHover={{
            scale: 1.1,
            rotate: -10,
          }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          <FaArrowCircleLeft className="text-lg md:text-3xl text-white hover:text-[#04AA6D] transition-colors duration-300" />
        </motion.button>

        {/* Skill Icons Row */}
        <motion.div
          className="flex space-x-10 items-center"
          variants={itemVariants}
        >
          {[leftIndex, centerIndex, rightIndex].map((index) => {
            const isCenter = index === centerIndex;

            const handleMouseMove = (e) => {
              if (!isCenter) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const rotateX = (e.clientY - centerY) / 20;
              const rotateY = (e.clientX - centerX) / 20;

              setRotates(prev => ({ ...prev, [index]: { x: rotateY, y: -rotateX } }));
            };

            const handleMouseLeave = () => {
              setRotates(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
            };

            return (
              <motion.div
                key={skills[index].name}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: isCenter ? 1.1 : 0.9,
                  opacity: isCenter ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className={`relative group ${isCenter ? 'cursor-pointer' : ''}`}
                onMouseMove={isCenter ? handleMouseMove : undefined}
                onMouseLeave={isCenter ? handleMouseLeave : undefined}
                onHoverStart={() => isCenter && setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  rotateX: isCenter ? (rotates[index]?.y || 0) : 0,
                  rotateY: isCenter ? (rotates[index]?.x || 0) : 0,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Glow Effect for Center */}
                {isCenter && (
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-[#04AA6D] via-transparent to-[#04AA6D] rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500"
                    animate={{
                      opacity: hoveredIndex === index ? 0.3 : 0,
                    }}
                  />
                )}

                <motion.div
                  className={`w-15 h-15 md:w-42 md:h-42 flex items-center justify-center rounded-full shadow-xl select-none backdrop-blur-sm transition-all duration-500 ${
                    isCenter
                      ? "bg-gray-900/50 border-2 border-[#04AA6D]/50 ring-2 ring-[#04AA6D]/20 shadow-[#04AA6D]/20"
                      : "bg-gray-900/30 border border-gray-800/50"
                  }`}
                  whileHover={isCenter ? {
                    scale: 1.05,
                    borderColor: "#04AA6D",
                    boxShadow: "0 25px 50px -12px rgba(4, 170, 109, 0.25)",
                  } : {}}
                >
                  <motion.div
                    animate={isCenter ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    {skills[index].icon}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Arrow */}
        <motion.button
          onClick={handleNext}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:bg-[#04AA6D]/20 hover:border-[#04AA6D] p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#04AA6D]/20"
          whileHover={{
            scale: 1.1,
            rotate: 10,
          }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
        >
          <FaArrowCircleRight className="text-lg md:text-3xl text-white hover:text-[#04AA6D] transition-colors duration-300" />
        </motion.button>
      </motion.div>

      {/* Description for center skill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={skills[centerIndex].name}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-15 max-w-sm md:max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 p-8 rounded-2xl shadow-2xl hover:shadow-[#04AA6D]/10 transition-all duration-500 relative z-10"
          whileHover={{
            borderColor: "#04AA6D",
            boxShadow: "0 25px 50px -12px rgba(4, 170, 109, 0.25)",
          }}
        >
          <motion.h4
            className="text-2xl md:text-3xl font-bold text-white select-none mb-4"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[#04AA6D]">{skills[centerIndex].name}</span>
          </motion.h4>
          <motion.p
            className="text-sm md:text-base text-gray-300 leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {skills[centerIndex].description}
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 w-2 h-2 bg-[#04AA6D] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-1 h-1 bg-[#04AA6D] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}