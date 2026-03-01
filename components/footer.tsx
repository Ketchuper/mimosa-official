"use client"

import { motion } from "framer-motion"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="py-16 px-4 md:px-8 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[var(--font-display)] text-4xl md:text-5xl text-foreground">
              MIMO<span className="text-primary neon-glow">$</span>A
            </h2>
            <p className="text-muted-foreground text-sm mt-2">Creative Crew from Okinawa</p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.a
              href="https://www.instagram.com/mimosa.mybrain/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(43,166,27,0.4)",
                boxShadow: "0 0 20px rgba(43,166,27,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              data-hover
              aria-label="Instagram (mimosa.mybrain)"
            >
              <InstagramIcon className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@thesantasゆうと"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
              }}
              whileHover={{
                scale: 1.1,
                borderColor: "rgba(43,166,27,0.4)",
                boxShadow: "0 0 20px rgba(43,166,27,0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              data-hover
              aria-label="YouTube (thesantasゆうと)"
            >
              <YoutubeIcon className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground text-sm">
            © 2026 MIMO$A
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
