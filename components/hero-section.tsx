"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

function FloatingParticle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary rounded-full"
      style={{ left: x, top: y }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        y: [0, -30, 0],
        x: [0, 15, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [particles, setParticles] = useState<{ x: string; y: string; delay: number }[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 15 }, () => ({
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Subtle radial glow behind logo */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(43,166,27,0.06) 0%, transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle, index) => (
          <FloatingParticle key={`p-${index}`} {...particle} />
        ))}
      </div>

      {/* Gradient Overlay top and bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      {/* Main Logo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo image with cinematic reveal */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.6, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Green glow pulse behind logo */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              filter: "blur(40px)",
              background: "rgba(43,166,27,0.1)",
              borderRadius: "50%",
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

<Image
            src="/images/mimosa-logo.png"
            alt="MIMO$A Logo"
            width={500}
            height={500}
            className="w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-[500px] h-auto relative z-10 drop-shadow-[0_0_30px_rgba(43,166,27,0.15)]"
            priority
            unoptimized // 👈 これを追記するだけ！
          />
        </motion.div>

        {/* Tagline with staggered entrance */}
        <motion.p
          className="mt-8 text-muted-foreground text-xs md:text-sm uppercase tracking-[0.4em] font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
        >
          Creative Crew from Okinawa
        </motion.p>

        {/* Animated line */}
        <motion.div
          className="mt-8 w-px bg-gradient-to-b from-primary/60 to-transparent"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 64, opacity: 1 }}
          transition={{ delay: 2, duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/20 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}