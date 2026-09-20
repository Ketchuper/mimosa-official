"use client"

import Image from "next/image"
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

export function Footer() {
  return (
    <footer className="py-16 px-4 md:px-8 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            className="flex flex-col items-center text-center w-full max-w-[16rem] md:max-w-[18rem]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full flex justify-center">
              <Image
                src="/images/mimosa-logo.png"
                alt="MIMO$A"
                width={288}
                height={72}
                className="w-full h-auto object-contain object-center max-w-full"
              />
            </div>
            <p className="text-muted-foreground text-sm mt-2 tracking-wide w-full">
              Creative crew <span className="uppercase">BASED IN OKINAWA</span>
            </p>
          </motion.div>

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
          </motion.div>
        </div>

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
