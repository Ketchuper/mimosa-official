"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function BookUsCta() {
  return (
    <section className="relative py-24 md:py-32 px-4 md:px-8 bg-background overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
      </div>

      {/* Thin top rule */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="h-px bg-border mb-16 md:mb-20"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative text-center">
        {/* Headline */}
        <motion.h2
          className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase text-foreground leading-none"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          LET'S MAKE IT
          <br />
          <span className="text-primary neon-glow">HAPPEN.</span>
        </motion.h2>

        {/* Sub-copy */}
        <motion.p
          className="mt-6 md:mt-8 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          枠に囚われないエンターテインメントを共に創り上げる、パートナー・協賛企業を募集しています。
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 md:mt-12"
        >
          <motion.a
            href="mailto:info@mimosa.okinawa"
            className="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-primary text-primary-foreground font-[var(--font-display)] text-lg md:text-xl uppercase tracking-wider rounded-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-hover
            style={{
              boxShadow:
                "0 0 30px rgba(43,166,27,0.25), 0 0 60px rgba(43,166,27,0.10)",
            }}
          >
            <span>Book us via email</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
