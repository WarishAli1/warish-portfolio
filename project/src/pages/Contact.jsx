import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    message: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ isSubmitting: true, isSubmitted: false, message: "" });

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setStatus({
          isSubmitting: false,
          isSubmitted: true,
          message: "Message sent successfully.",
        });
        setFormData({ from_name: "", from_email: "", subject: "", message: "" });
      })
      .catch(() => {
        setStatus({
          isSubmitting: false,
          isSubmitted: false,
          message: "Failed to send message. Try again.",
        });
      });
  };

  return (
    <main
      className={`min-h-screen grid-bg ${
        isDarkMode ? "dark-grid" : "light-grid"
      }`}
    >
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1
            className={`text-4xl sm:text-5xl font-semibold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Contact
          </h1>
          <p
            className={`max-w-xl ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have a question, idea, or collaboration in mind?  
            Send a message or reach out through my socials.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <FiMail />
                <span>warishkhan384@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiPhone />
                <span>+977-9867779824</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiMapPin />
                <span>Kathmandu, Nepal</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/warishali1" target="_blank">
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/warish-ali-885923363"
                target="_blank"
              >
                <FiLinkedin size={20} />
              </a>
              <a href="https://x.com/myself_warish" target="_blank">
                <FiTwitter size={20} />
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`p-8 rounded-2xl border space-y-6 ${
              isDarkMode
                ? "bg-black/30 border-white/10"
                : "bg-white/70 border-gray-200"
            }`}
          >
            {status.isSubmitted && (
              <div className="text-sm text-green-500">{status.message}</div>
            )}

            {["name", "email", "subject"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={field}
                className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${
                  isDarkMode
                    ? "bg-black/30 border-white/20 text-gray-200 focus:border-white"
                    : "bg-white border-gray-300 focus:border-black"
                }`}
              />
            ))}

            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message"
              className={`w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none ${
                isDarkMode
                  ? "bg-black/30 border-white/20 text-gray-200 focus:border-white"
                  : "bg-white border-gray-300 focus:border-black"
              }`}
            />

            <button
              type="submit"
              disabled={status.isSubmitting}
              className={`inline-flex items-center gap-2 px-6 py-3 text-sm rounded-full border transition ${
                isDarkMode
                  ? "border-white/30 text-white hover:border-white"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              {status.isSubmitting ? "Sending..." : "Send Message"}
              <FiSend />
            </button>
          </motion.form>
        </div>
      </section>
    <div className="relative inset-0 pointer-events-none flex items-end">
      <div className="w-full px-6 pb-4">
        <span
          className={`font-black select-none ${
            isDarkMode ? "text-gray-200" : "text-ink"
          }`}
          style={{
            fontSize: window.innerWidth < 768 ? "60px" : "120px",
            lineHeight: "1",
            whiteSpace: "nowrap",
            opacity: 0.08,
            display: "block",
            textAlign: "left",
            transform: "translateX(-3%)"
          }}
        >
          CONTACT.
        </span>
      </div>
    </div>
    </main>
  );
}
