"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconLoader2, IconCheck } from "@tabler/icons-react";
import { oswald } from "@/lib/constants";
import { submitContactMessage } from "@/lib/serverAction";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    query: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await submitContactMessage(formData);

      if (res.success) {
        setStatus("success");
        setTimeout(() => {
          setStatus("idle");
          setFormData({ name: "", email: "", mobile: "", query: "" });
          onClose();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black/60 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(16,185,129,0.15)] rounded-2xl p-6 md:p-8 max-w-lg w-full relative pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
              >
                <IconX size={20} />
              </button>

              {/* Header */}
              <div className="mb-8 text-center md:text-left">
                <h2
                  className={`${oswald.className} text-3xl font-bold uppercase tracking-wide text-white drop-shadow-md mb-2`}
                >
                  Initiate <span className="text-emerald-400">Comms</span>
                </h2>
                <p className="font-mono text-sm text-white/50 uppercase tracking-widest">
                  // Ping my terminal directly
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider ml-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-white/20 hover:bg-white/10"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-xs font-mono text-white/70 uppercase tracking-wider ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-white/20 hover:bg-white/10"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label className="text-xs font-mono text-white/70 uppercase tracking-wider ml-1">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-white/20 hover:bg-white/10"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase tracking-wider ml-1">
                    Query
                  </label>
                  <textarea
                    name="query"
                    required
                    rows={4}
                    value={formData.query}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-white/20 hover:bg-white/10 resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`mt-4 w-full rounded-lg py-3.5 px-4 font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2
                    ${
                      status === "success"
                        ? "bg-emerald-500 text-black"
                        : "bg-white text-black hover:bg-emerald-400 hover:scale-[1.02] active:scale-95"
                    }
                  `}
                >
                  {status === "idle" && "Send Message"}
                  {status === "loading" && (
                    <>
                      <IconLoader2 className="animate-spin" size={20} />
                      Transmitting...
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <IconCheck size={20} />
                      Message Received
                    </>
                  )}
                  {status === "error" && "Error - Try Again"}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
