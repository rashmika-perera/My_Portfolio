import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Social = () => {
  return (
    <motion.div
      className="fixed md:top-3/4 top-6/7 right-0 transform -translate-y-4/5 md:-translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 2.0, duration: 0.5 }}
    >
      <ul className=" flex flex-col items-center space-y-5 pr-10">
        <li>
          <a
            href="https://github.com/rashmika-perera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 rounded-full hover:text-[#04AA6D] transition"
          >
            <FaGithub size={30} />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/rashmika-perera-b49142291/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 rounded-full hover:text-[#04AA6D] transition"
          >
            <FaLinkedin size={30} />
          </a>
        </li>
        <li>
          <a
            href="mailto:rashmikaperera330@gmail.com"
            className="text-gray-400 rounded-full hover:text-[#04AA6D] transition"
          >
            <HiOutlineMail size={30} />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/Shavindu20041?mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 rounded-full hover:text-[#04AA6D] transition"
          >
            <FaFacebook size={30} />
          </a>
        </li>
      </ul>
    </motion.div>
  );
};

export default Social;
