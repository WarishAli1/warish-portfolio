import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import emailjs from "@emailjs/browser";

export default function Contact() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white relative overflow-hidden px-6 py-24">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[200%] h-[2px] bg-purple-500/30 rotate-45 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[200%] h-[2px] bg-blue-500/30 -rotate-45 animate-pulse" />
      </div>

      <motion.h1
        className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
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
          <p className="text-gray-400 text-lg">
            Have a project idea or just want to say hi? Connect with me through any of the platforms below or send a message directly.
          </p>

          <div className="flex flex-col gap-5 text-gray-300">
            <div className="flex items-center gap-3 hover:text-purple-400 transition">
              <FiMail className="text-purple-400" /> warishkhan384@gmail.com
            </div>
            <div className="flex items-center gap-3 hover:text-purple-400 transition">
              <FiPhone className="text-purple-400" /> +977-9867779824
            </div>
            <div className="flex items-center gap-3 hover:text-purple-400 transition">
              <FiMapPin className="text-purple-400" /> Kathmandu, Nepal
            </div>
          </div>

          <div className="flex gap-5 mt-6">
            <motion.a whileHover={{ scale: 1.3 }} href="https://github.com/warishali1" target="_blank" rel="noopener noreferrer">
              <FiGithub size={28} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.3 }} href="https://linkedin.com/in/warish-ali-885923363" target="_blank" rel="noopener noreferrer">
              <FiLinkedin size={28} />
            </motion.a>
            <motion.a whileHover={{ scale: 1.3 }} href="https://x.com/myself_warish" target="_blank" rel="noopener noreferrer">
              <FiTwitter size={28} />
            </motion.a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-col gap-6 bg-black/20 p-10 rounded-2xl border border-white/20 backdrop-blur-md shadow-[0_0_60px_rgba(128,0,255,0.3)]"
        >
          {status.isSubmitted && (
            <div className="mb-4 p-3 bg-green-600/20 text-green-300 text-center rounded-lg">
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
              className="w-full px-5 py-4 text-gray-200 bg-black/20 border border-gray-600 rounded-xl backdrop-blur-md 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-black 
              transition-all shadow-lg hover:shadow-purple-500/20 placeholder-gray-400"
            />
          ))}

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Write your message..."
            className="w-full px-5 py-4 text-gray-200 bg-black/20 border border-gray-600 rounded-xl backdrop-blur-md 
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-black 
            transition-all resize-none shadow-lg hover:shadow-blue-500/20 placeholder-gray-400"
          ></textarea>

          <motion.button
            type="submit"
            disabled={status.isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 font-semibold shadow-lg flex items-center justify-center gap-2"
          >
            {status.isSubmitting ? "Sending..." : <>Send <FiSend /></>}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
