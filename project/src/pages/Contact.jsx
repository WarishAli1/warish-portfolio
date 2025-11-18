import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";
import NeonLinesBackground from "../context/NeonLinesBackground";
export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ isSubmitting: false, isSubmitted: false, message: "" });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ isSubmitting: true, isSubmitted: false, message: "" });

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const emailParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      time: formattedTime,
    };

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY)
      .then(() => {
        setStatus({ isSubmitting: false, isSubmitted: true, message: "Message sent successfully! 🚀" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setStatus({
          isSubmitting: false,
          isSubmitted: false,
          message: "Failed to send message. Please try again.",
        });
      });
  };
  
  const bgGradient = isDarkMode
    ? "bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white"
    : "hero-light";


  return (
    <div className={`min-h-screen relative overflow-hidden px-6 py-24 ${bgGradient}`}>
      <NeonLinesBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className={`${isDarkMode ? "w-[200%] h-[2px] bg-purple-500/30 rotate-45 animate-pulse" : "w-full h-[1px] bg-blue-300/30"} absolute top-0 left-0`} />
        <div className={`${isDarkMode ? "w-[200%] h-[2px] bg-blue-500/30 -rotate-45 animate-pulse" : "w-full h-[1px] bg-blue-300/30"} absolute bottom-0 right-0`} />
      </div>

      <motion.h1
        className={`text-5xl text-center mb-12 ${isDarkMode ? "font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500" : "font-normal text-black"}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get In Touch
      </motion.h1>

      <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center gap-8"
        >
          <p className={`${isDarkMode ? "text-gray-400" : "text-black"} text-lg`}>
            Have a project idea or just want to say hi? Connect with me through any of the platforms below or send a message directly.
          </p>

          <div className={`flex flex-col gap-5 ${isDarkMode ? "text-gray-300" : "text-black"}`}>
           <div className={`flex items-center gap-3 transition-transform duration-200 hover:scale-105`}>
              <FiMail className={`${isDarkMode ? "text-purple-400" : "text-blue"}`} />
              warishkhan384@gmail.com
            </div>
            <div className={`flex items-center gap-3 transition-transform duration-200 hover:scale-105`}>
              <FiPhone className={`${isDarkMode ? "text-purple-400" : "text-blue"}`} /> +977-9867779824
            </div>
            <div className={`flex items-center gap-3 transition-transform duration-200 hover:scale-105`}>
              <FiMapPin className={`${isDarkMode ? "text-purple-400" : "text-blue"}`} /> Kathmandu, Nepal
            </div>
          </div>

          <div className="flex gap-5 mt-6">
            <motion.a whileHover={{ scale: 1.3 }} href="https://github.com/warishali1" target="_blank" rel="noopener noreferrer">
              <FiGithub size={28} className={`${isDarkMode ? "text-white" : "text-black"}`} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.3 }} href="https://linkedin.com/in/warish-ali-885923363" target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={28} className={`${isDarkMode ? "text-white" : "text-black"}`} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.3 }} href="https://x.com/myself_warish" target="_blank" rel="noopener noreferrer">
              <FiTwitter size={28} className={`${isDarkMode ? "text-white" : "text-black"}`} />
            </motion.a>
          </div>
        </motion.div>

 <motion.form
  onSubmit={handleSubmit}
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className={`relative flex flex-col gap-6 p-10 rounded-2xl backdrop-blur-md ${
    isDarkMode
      ? "bg-black/20 border border-white/20 shadow-[0_0_60px_rgba(128,0,255,0.3)]"
      : "bg-gray-100 border border-black shadow-[0_0_60px_rgba(59,130,246,0.35)]"
  }`}
>
  {status.isSubmitted && (
    <div
      className={`mb-4 p-3 rounded-lg text-center ${
        isDarkMode ? "bg-green-600/20 text-green-300" : "bg-green-200 text-green-800 font-semibold"
      }`}
    >
      {status.message}
    </div>
  )}

  {["name", "email", "subject"].map((field) => (
    <input
      key={field}
      type={field === "email" ? "email" : "text"}
      name={field}
      value={formData[field]}
      onChange={handleChange}
      required
      placeholder={`${field}`}
      className={`w-full px-5 py-4 rounded-xl transition-all placeholder-gray-500 focus:outline-none focus:ring-2 ${
        isDarkMode
          ? "text-gray-200 bg-black/20 border border-gray-600 shadow-lg focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-black hover:shadow-purple-500/20"
          : "text-black bg-gray-100 border border-black shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:ring-blue-500 focus:ring-offset-gray-50 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
      }`}
    />
  ))}

  <textarea
    name="message"
    value={formData.message}
    onChange={handleChange}
    required
    rows="5"
    placeholder="Write your message..."
    className={`w-full px-5 py-4 rounded-xl transition-all resize-none placeholder-gray-500 focus:outline-none focus:ring-2 ${
      isDarkMode
        ? "text-gray-200 bg-black/20 border border-gray-600 shadow-lg focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-black hover:shadow-purple-500/20"
        : "text-black bg-gray-100 border border-black shadow-[0_0_15px_rgba(59,130,246,0.5)] focus:ring-blue-500 focus:ring-offset-gray-50 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
    }`}
  ></textarea>

  <motion.button
    type="submit"
    disabled={status.isSubmitting}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`mt-4 py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all ${
      isDarkMode
        ? "bg-gradient-to-r from-purple-500 to-blue-600 font-semibold shadow-lg text-white"
        : "bg-white/30 text-black border border-black backdrop-blur-xl font-semibold shadow-md hover:bg-white/40"
    }`}
    style={!isDarkMode ? { backdropFilter: "blur(14px)" } : {}}
  >
    {status.isSubmitting ? "Sending..." : <>Send <FiSend /></>}
  </motion.button>
</motion.form>



      </div>
    </div>
  );
}
