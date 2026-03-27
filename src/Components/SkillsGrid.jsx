import React from "react";
import { motion } from "framer-motion";
import tailwind from "./assets/Tailwind CSS.webp";
import python from "./assets/Python.webp";
import CSharp from "./assets/CSharp.webp";
import { GrMysql } from "react-icons/gr";
import { IoLogoFirebase } from "react-icons/io5";
import { SiSpring, SiTypescript, SiNextdotjs, SiSupabase } from "react-icons/si";
import {
  FaReact,
  FaGithub,
  FaJava,
  FaNodeJs,
} from "react-icons/fa";

const skills = [
  {
    name: "React",
    icon: <FaReact className="text-[#61DAFB] text-4xl md:text-5xl" />,
    description: "Expert in building modern, high-performance web interfaces.",
    color: "from-[#61DAFB]/20",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-white text-4xl md:text-5xl" />,
    description: "SSR & App Router specialist for high-performance React apps.",
    color: "from-white/20",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Tailwind CSS",
    icon: <img src={tailwind} alt="Tailwind" className="w-7 h-7 md:w-9 md:h-9 object-contain" />,
    description: "Utility-first CSS styling master.",
    color: "from-[#38B2AC]/20",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-[#3178C6] text-3xl md:text-4xl" />,
    description: "Enterprise-grade type safety.",
    color: "from-[#3178C6]/20",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="text-[#339933] text-3xl md:text-4xl" />,
    description: "Scalable server-side environments.",
    color: "from-[#339933]/20",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    name: "Supabase",
    icon: <SiSupabase className="text-[#3ECF8E] text-3xl md:text-4xl" />,
    description: "Real-time DB & Auth services.",
    color: "from-[#3ECF8E]/20",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    name: "JAVA",
    icon: <FaJava className="text-[#007396] text-3xl md:text-4xl" />,
    description: "Backend architecture and logic.",
    color: "from-[#007396]/20",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Python",
    icon: <img src={python} alt="Python" className="w-7 h-7 md:w-9 md:h-9 object-contain" />,
    description: "Data processing and automation.",
    color: "from-[#3776AB]/20",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "C#",
    icon: <img src={CSharp} alt="C#" className="w-7 h-7 md:w-9 md:h-9 object-contain" />,
    description: "Modern desktop and web services.",
    color: "from-[#239120]/20",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "MySQL",
    icon: <GrMysql className="text-[#4479A1] text-3xl md:text-4xl" />,
    description: "Relational data management.",
    color: "from-[#4479A1]/20",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    name: "Firebase",
    icon: <IoLogoFirebase className="text-[#FFCA28] text-3xl md:text-4xl" />,
    description: "Cloud app infrastructure.",
    color: "from-[#FFCA28]/20",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    name: "Git & GitHub",
    icon: <FaGithub className="text-white text-3xl md:text-4xl" />,
    description: "Version control & collaboration.",
    color: "from-white/10",
    span: "md:col-span-1 md:row-span-1",
  },
];

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        rotateY: 360,
        transition: { duration: 0.3 }
      }}
      className={`relative group overflow-hidden rounded-3xl p-6 bg-gray-900/40 backdrop-blur-md border border-gray-800/50 hover:border-[#04AA6D]/50 transition-all duration-500 ${skill.span}`}
    >
      {/* Gradient Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-br ${skill.color} to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-3 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
          >
            {skill.icon}
          </motion.div>
          <div className="w-2 h-2 rounded-full bg-[#04AA6D] animate-pulse" />
        </div>

        <div className="mt-6">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-[#04AA6D] transition-colors">
            {skill.name}
          </h3>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Modern Interactive Pattern */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="2" cy="2" r="2" fill="currentColor" className="text-[#04AA6D]" />
          <circle cx="2" cy="18" r="2" fill="currentColor" className="text-[#04AA6D]" />
          <circle cx="2" cy="34" r="2" fill="currentColor" className="text-[#04AA6D]" />
          <circle cx="18" cy="2" r="2" fill="currentColor" className="text-[#04AA6D]" />
          <circle cx="18" cy="18" r="2" fill="currentColor" className="text-[#04AA6D]" />
          <circle cx="34" cy="2" r="2" fill="currentColor" className="text-[#04AA6D]" />
        </svg>
      </div>
    </motion.div>
  );
};

export default function SkillsGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[160px] md:auto-rows-[180px]">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}
