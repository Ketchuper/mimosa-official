"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getSectionTitles } from "@/lib/i18n"
import { HOMEPAGE_NEWS_LIMIT, homepageNews, type NewsItem } from "@/lib/news"

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

export function LatestNews({ items = homepageNews, showArchiveLink = true }: { items?: NewsItem[]; showArchiveLink?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [currentItems, setCurrentItems] = useState(items)

  useEffect(() => {
    let active = true
    const refreshNews = async () => {
      try {
        const response = await fetch("/api/news", { cache: "no-store" })
        if (!response.ok) return
        const payload: { news?: NewsItem[] } = await response.json()
        if (active && Array.isArray(payload.news)) {
          setCurrentItems(showArchiveLink ? payload.news.slice(0, HOMEPAGE_NEWS_LIMIT) : payload.news)
        }
      } catch {
        // Keep the bundled news visible if the management sheet is temporarily unavailable.
      }
    }

    void refreshNews()
    const interval = window.setInterval(() => void refreshNews(), 60_000)
    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [showArchiveLink])

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
      id="news"
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
          </div>

          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            {getSectionTitles().news.prefix}
            <span className="text-primary neon-glow">{getSectionTitles().news.highlight}</span>
          </h2>
        </motion.div>

        {/* News entries as terminal output */}
        <div className="space-y-0 font-mono">
          {currentItems.map((item, index) => (
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

        {showArchiveLink && (
          <div className="mt-10">
            <Link
              href="/news"
              data-hover
              className="group inline-flex min-h-11 items-center gap-2 border border-primary/40 bg-transparent px-5 py-3 font-mono text-sm font-bold tracking-wide text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black hover:shadow-[0_0_18px_rgba(43,166,27,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <span aria-hidden="true" className="text-primary/50 transition-colors group-hover:text-black/70">{'>'}</span>
              <span>ニュースをすべて見る</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">{'->'}</span>
            </Link>
          </div>
        )}

      </div>
    </section>
  )
}
