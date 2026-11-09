"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconLoader2, IconCheck } from "@tabler/icons-react";
import { oswald } from "@/lib/constants";
import { submitContactMessage } from "@/lib/serverAction";
import { CONTACT_LIMITS, type ContactInput } from "@/lib/contact";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPTY_FORM: ContactInput = {
  name: "",
  email: "",
  mobile: "",
  query: "",
  hp: "",
};

const FOCUSABLE =
  'button:not([disabled]), input:not([tabindex="-1"]):not([disabled]), textarea:not([disabled]), a[href]';

const labelClass =
  "text-xs font-mono text-white/70 uppercase tracking-wider ml-1";
const fieldClass =
  "bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 w-full focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-white/20 hover:bg-white/10";

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactInput>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const uid = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const successTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openRef = useRef(isOpen);
  // The parent passes a new onClose every render, so keep the latest in a ref
  // and let the effects below depend only on isOpen.
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const handleClose = useCallback(() => {
    clearTimeout(successTimer.current);
    setStatus((current) => (current === "success" ? "idle" : current));
    onCloseRef.current();
  }, []);

  useEffect(() => {
    openRef.current = isOpen;
    if (!isOpen) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    const focusTimer = setTimeout(() => nameRef.current?.focus(), 50);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [isOpen, handleClose]);

  useEffect(() => () => clearTimeout(successTimer.current), []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await submitContactMessage(formData);

      // The visitor closed the form while it was sending: tidy up quietly.
      if (!openRef.current) {
        if (res.success) setFormData(EMPTY_FORM);
        setStatus("idle");
        return;
      }

      if (res.success) {
        setFormData(EMPTY_FORM);
        setStatus("success");
        successTimer.current = setTimeout(handleClose, 2000);
      } else {
        // The typed text stays in the form so nothing is lost.
        setErrorMessage(res.error);
        setStatus("error");
      }
    } catch {
      if (openRef.current) {
        setErrorMessage("Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("idle");
      }
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
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${uid}-title`}
              onKeyDown={handleDialogKeyDown}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black/60 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(59,130,246,0.15)] rounded-2xl p-6 md:p-8 max-w-lg w-full relative pointer-events-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close contact form"
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-1.5 rounded-full"
              >
                <IconX size={20} />
              </button>

              {/* Header */}
              <div className="mb-8 text-center md:text-left">
                <h2
                  id={`${uid}-title`}
                  className={`${oswald.className} text-3xl font-bold uppercase tracking-wide text-white drop-shadow-md mb-2`}
                >
                  Initiate <span className="text-blue-400">Comms</span>
                </h2>
                <p className="font-mono text-sm text-white/50 uppercase tracking-widest">
                  // Ping my terminal directly
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${uid}-name`} className={labelClass}>
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    id={`${uid}-name`}
                    type="text"
                    name="name"
                    required
                    maxLength={CONTACT_LIMITS.name}
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label htmlFor={`${uid}-email`} className={labelClass}>
                      Email
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      name="email"
                      required
                      maxLength={CONTACT_LIMITS.email}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 flex-1">
                    <label htmlFor={`${uid}-mobile`} className={labelClass}>
                      Mobile <span className="normal-case text-white/40">(optional)</span>
                    </label>
                    <input
                      id={`${uid}-mobile`}
                      type="tel"
                      name="mobile"
                      maxLength={CONTACT_LIMITS.mobile}
                      autoComplete="tel"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor={`${uid}-query`} className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id={`${uid}-query`}
                    name="query"
                    required
                    rows={4}
                    maxLength={CONTACT_LIMITS.query}
                    autoComplete="off"
                    value={formData.query}
                    onChange={handleChange}
                    className={`${fieldClass} resize-none`}
                    placeholder="How can I help you?"
                  />
                </div>

                {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
                  <input
                    id={`${uid}-hp`}
                    type="text"
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.hp}
                    onChange={handleChange}
                  />
                </div>

                {status === "error" && errorMessage && (
                  <p
                    role="alert"
                    className="font-mono text-xs text-red-300 -mb-1"
                  >
                    {errorMessage}
                  </p>
                )}
                <p className="sr-only" aria-live="polite">
                  {status === "success" ? "Message sent." : ""}
                </p>

                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className={`mt-4 w-full rounded-lg py-3.5 px-4 font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2
                    ${
                      status === "success"
                        ? "bg-blue-500 text-black"
                        : "bg-white text-black hover:bg-blue-400 hover:scale-[1.02] active:scale-95"
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
                  {status === "error" && "Try Again"}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
