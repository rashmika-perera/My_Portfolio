// eslint-disable-next-line no-unused-vars
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // EmailJS configuration - Replace these with your actual EmailJS credentials
  const SERVICE_ID = 'service_insxkm3'; // Replace with your EmailJS service ID
  const TEMPLATE_ID = 'template_1slmqzi'; // Replace with your EmailJS template ID
  const PUBLIC_KEY = '5iekLZaoSG9iFOd8m'; // Replace with your EmailJS public key

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Rashmika Perera', // Your name
        reply_to: formData.email,
      };

      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      // Success handling
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' }); // Clear form

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send message. Please check your EmailJS configuration or contact me directly at your.email@example.com');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      id="contact"
      className="py-16 relative overflow-hidden"
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

        .contact-input:focus {
          outline: none;
          border-color: #04AA6D;
          box-shadow: 0 0 0 3px rgba(4, 170, 109, 0.1);
        }

        .contact-textarea:focus {
          outline: none;
          border-color: #04AA6D;
          box-shadow: 0 0 0 3px rgba(4, 170, 109, 0.1);
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
            Let's Connect
          </h1>

          <div className="relative inline-block mb-24 mt-4 w-[400px] md:w-[600px]">
            <h1 className="text-4xl md:text-5xl font-bold text-center">
              Get In <span className="text-[#04AA6D]">Touch</span>
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

        <motion.p
          className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Ready to bring your ideas to life? Let's collaborate and create something amazing together.
        </motion.p>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 relative z-10"
        variants={containerVariants}
      >
        <motion.div
          className="group relative"
          variants={cardVariants}
          onHoverStart={() => setHoveredIndex(0)}
          onHoverEnd={() => setHoveredIndex(null)}
          whileHover={{
            y: -5,
            transition: { duration: 0.3 }
          }}
        >
          {/* Form Glow Effect */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-[#04AA6D] via-transparent to-[#04AA6D] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
            animate={{
              opacity: hoveredIndex === 0 ? 0.2 : 0,
            }}
          />

          {/* Main Form Card */}
          <motion.div
            className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#04AA6D]/10 transition-all duration-500 p-8 md:p-12"
            whileHover={{
              borderColor: "#04AA6D",
              boxShadow: "0 25px 50px -12px rgba(4, 170, 109, 0.25)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="contact-input w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-[#04AA6D] transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="contact-input w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-[#04AA6D] transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <label className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <div className="relative">
                  <FaComment className="absolute left-4 top-4 text-gray-400 text-sm" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="contact-textarea w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-[#04AA6D] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-[#04AA6D] to-[#038f5c] hover:from-[#038f5c] hover:to-[#04AA6D] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#04AA6D]/25 flex items-center justify-center gap-3 mx-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  whileHover={!isLoading && !isSubmitted ? { scale: 1.05 } : {}}
                  whileTap={!isLoading && !isSubmitted ? { scale: 0.95 } : {}}
                  disabled={isLoading || isSubmitted}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FaCheck className="text-lg" />
                      Sent Successfully!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="mt-8 p-4 bg-[#04AA6D]/20 border border-[#04AA6D]/30 rounded-xl text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <FaCheck className="text-[#04AA6D] text-2xl mx-auto mb-2" />
                  </motion.div>
                  <p className="text-white font-medium">Thank you for your message!</p>
                  <p className="text-gray-300 text-sm">I'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="mt-8 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-center"
                >
                  <FaExclamationTriangle className="text-red-400 text-2xl mx-auto mb-2" />
                  <p className="text-white font-medium">Oops! Something went wrong.</p>
                  <p className="text-gray-300 text-sm">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;