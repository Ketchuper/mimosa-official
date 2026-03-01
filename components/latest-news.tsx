"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

type NewsTag = "EVENT" | "RELEASE" | "VIDEO"

const newsData: Array<{
  id: number
  date: string
  tag: NewsTag
  title: string
  url: string
}> = [
  {
    id: 1,
    date: "2026.02.06",
    tag: "EVENT",
    title: "ドキュメンタリー映画「ReSTART」コラボドリンク販売開始",
    url: "https://www.instagram.com/reel/DUabKs3E0d2/?igsh=NXhtdGx2bzEya3My",
  },
  {
    id: 2,
    date: "2026.02.02",
    tag: "EVENT",
    title: "沖縄アリーナ「VIBE NATION 2026」出演決定",
    url: "https://www.instagram.com/reel/DUQDGuOkn7W/?igsh=MXRvMDRyMjJiaGVmdQ==",
  },
  {
    id: 3,
    date: "2026.01.25",
    tag: "RELEASE",
    title: "Yuto Ishizawa 1st Single「#ポンコツ」MV公開",
    url: "https://youtu.be/lCy4vK0thvs?si=GVS0V8mE_vC5ebBq",
  },
  {
    id: 4,
    date: "2026.01.24",
    tag: "RELEASE",
    title: "Yuto Ishizawa 1st Single「#ポンコツ」サブスクリリース",
    url: "https://linkco.re/nPB0FzEH?lang=ja",
  },
  {
    id: 5,
    date: "2026.01.20",
    tag: "RELEASE",
    title: "Da-win 「Fly」サブスク配信開始",
    url: "https://linkco.re/Gc4NavTt?lang=ja",
  },
]

/* Typing animation for terminal text */
function TerminalTyping({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 18)
    return () => clearInterval(interval)
  }, [text, started])

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[7px] h-[14px] bg-primary ml-[1px] animate-pulse" />
      )}
    </span>
  )
}

export function LatestNews() {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          {/* Terminal window bar */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-muted-foreground/40 text-xs font-mono tracking-wider">
              mimosa@okinawa:~/news
            </span>
          </div>

          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            LATEST <span className="text-primary neon-glow">NEWS</span>
          </h2>
          <p className="text-primary/40 text-xs font-mono mt-3 tracking-wider">
            {'>'} system.broadcast --channel=all --priority=high
          </p>
        </motion.div>

        {/* News entries as terminal output */}
        <div className="space-y-0 font-mono">
          {newsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border-b border-primary/[0.08] py-5 transition-all duration-500 hover:bg-primary/[0.04] hover:pl-4"
                data-hover
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                  {/* Terminal prompt */}
                  <span className="text-primary/30 text-xs hidden md:inline shrink-0">
                    {'>'}
                  </span>

                  {/* Date */}
                  <span className="text-muted-foreground/60 text-xs shrink-0 tabular-nums group-hover:text-primary/60 transition-colors duration-500">
                    [{item.date}]
                  </span>

                  {/* Category badge */}
                  <span
                    className="text-xs font-bold uppercase tracking-wider shrink-0 px-2 py-0.5 w-fit transition-all duration-500 text-primary/80 group-hover:text-primary-foreground group-hover:bg-primary"
                    style={{
                      border: "1px solid rgba(43,166,27,0.3)",
                      background: "rgba(43,166,27,0.08)",
                    }}
                  >
                    {item.tag}
                  </span>

                  {/* Title with typing effect */}
                  <span className="text-foreground/80 text-sm group-hover:text-primary transition-colors duration-500 flex-1">
                    {inView ? (
                      <TerminalTyping
                        text={item.title}
                        delay={600 + index * 300}
                      />
                    ) : null}
                  </span>

                  {/* Arrow */}
                  <motion.span
                    className="hidden md:block text-primary/30 group-hover:text-primary transition-colors duration-500"
                    whileHover={{ x: 5 }}
                  >
                    {"->"}
                  </motion.span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Terminal footer */}
        <motion.div
          className="mt-8 text-primary/20 text-xs font-mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <span className="animate-pulse">_</span> {newsData.length} entries loaded. End of broadcast.
        </motion.div>
      </div>
    </section>
  )
}
