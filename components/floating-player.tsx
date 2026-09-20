"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

/* ─────────────── Constants ─────────────── */
const DISC_SIZE = 120
const GROOVE_COUNT = 8
const BAR_COUNT = 64
const FFT_SIZE = 128
const HINT_KEY = "mimosa-groove-skip-hint-v1"

type Track = {
  id: string
  title: string
  artist: string
  src: string
  feat?: string
}

const tracks: Track[] = [
  {
    id: "so-high",
    title: "So High",
    artist: "Da-win",
    src: "/audio/so-high.mp3",
  },
  {
    id: "fly",
    title: "Fly (feat. Bendy & DJ Fourd Nkay)",
    artist: "Da-win",
    src: "/audio/fly.mp3",
    feat: "Bendy & DJ Fourd Nkay",
  },
  {
    id: "old-is-new",
    title: "OLD IS NEW",
    artist: "Da-win",
    src: "/audio/old-is-new.mp3",
  },
]

/* ─────────────── Scrolling title ─────────────── */
function ScrollingTitle({
  children,
  className,
  style,
}: {
  children: string
  className?: string
  style?: React.CSSProperties
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [shouldScroll, setShouldScroll] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    if (!container || !content) return
    setShouldScroll(content.scrollWidth > container.clientWidth)
  }, [children])

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full ${className ?? ""}`}
      style={style}
    >
      <motion.div
        ref={contentRef}
        className="inline-flex whitespace-nowrap will-change-transform"
        animate={shouldScroll ? { x: [0, "-50%"] } : {}}
        transition={
          shouldScroll
            ? {
                x: {
                  duration: 14,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatDelay: 2,
                },
              }
            : {}
        }
        style={{ width: "max-content" }}
      >
        <span className={shouldScroll ? "pr-6" : undefined}>{children}</span>
        {shouldScroll ? (
          <span className="pr-6" aria-hidden>
            {children}
          </span>
        ) : null}
      </motion.div>
    </div>
  )
}

/* ─────────────── useAudioAnalyser ─────────────── */
function useAudioAnalyser(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const dataRef = useRef<Uint8Array<ArrayBuffer>>(
    new Uint8Array(new ArrayBuffer(FFT_SIZE / 2))
  )
  const rafRef = useRef<number>(0)
  const [freqs, setFreqs] = useState<number[]>(() => new Array(BAR_COUNT).fill(0))
  const dipUntilRef = useRef(0)

  const init = useCallback(() => {
    const audio = audioRef.current
    if (!audio || ctxRef.current) return
    const ctx = new AudioContext()
    const analyser = ctx.createAnalyser()
    analyser.fftSize = FFT_SIZE
    analyser.smoothingTimeConstant = 0.8
    const source = ctx.createMediaElementSource(audio)
    source.connect(analyser)
    analyser.connect(ctx.destination)
    ctxRef.current = ctx
    analyserRef.current = analyser
    sourceRef.current = source
    dataRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount))
  }, [audioRef])

  const resume = useCallback(() => {
    if (ctxRef.current?.state === "suspended") {
      ctxRef.current.resume()
    }
  }, [])

  const dip = useCallback((ms = 150) => {
    dipUntilRef.current = performance.now() + ms
  }, [])

  const start = useCallback(() => {
    if (!analyserRef.current) return
    let frameCount = 0
    const loop = () => {
      const analyser = analyserRef.current
      if (!analyser) return
      analyser.getByteFrequencyData(dataRef.current)
      frameCount++
      if (frameCount % 2 === 0) {
        const binCount = analyser.frequencyBinCount
        const step = binCount / BAR_COUNT
        const dipping = performance.now() < dipUntilRef.current
        const result: number[] = []
        for (let i = 0; i < BAR_COUNT; i++) {
          const idx = Math.floor(i * step)
          const v = dataRef.current[idx] / 255
          result.push(dipping ? v * 0.15 : v)
        }
        setFreqs(result)
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
  }, [])

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setFreqs(new Array(BAR_COUNT).fill(0))
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return { freqs, init, start, stop, resume, dip }
}

/* ─────────────── SVG Grooves ─────────────── */
function DiscGrooves() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${DISC_SIZE} ${DISC_SIZE}`}
      aria-hidden="true"
    >
      {Array.from({ length: GROOVE_COUNT }).map((_, i) => {
        const r = 16 + i * 5
        return (
          <circle
            key={i}
            cx={DISC_SIZE / 2}
            cy={DISC_SIZE / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        )
      })}
    </svg>
  )
}

/* ─────────────── Circular Visualizer ─────────────── */
function CircularVisualizer({ freqs }: { freqs: number[] }) {
  const baseRadius = DISC_SIZE / 2 + 6

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        width: DISC_SIZE + 60,
        height: DISC_SIZE + 60,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      viewBox={`0 0 ${DISC_SIZE + 60} ${DISC_SIZE + 60}`}
      aria-hidden="true"
    >
      {freqs.map((amp, i) => {
        const angle = (i / BAR_COUNT) * Math.PI * 2 - Math.PI / 2
        const cx = (DISC_SIZE + 60) / 2
        const cy = (DISC_SIZE + 60) / 2
        const innerR = baseRadius
        const barLen = 2 + amp * 22
        const x1 = cx + Math.cos(angle) * innerR
        const y1 = cy + Math.sin(angle) * innerR
        const x2 = cx + Math.cos(angle) * (innerR + barLen)
        const y2 = cy + Math.sin(angle) * (innerR + barLen)
        const opacity = 0.15 + amp * 0.85

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#2ba61b"
            strokeWidth={1.5}
            strokeLinecap="round"
            opacity={opacity}
            style={{
              filter:
                amp > 0.5
                  ? `drop-shadow(0 0 ${2 + amp * 4}px rgba(43,166,27,0.6))`
                  : "none",
            }}
          />
        )
      })}
    </svg>
  )
}

/* ─────────────── Laser Needle (+ hop) ─────────────── */
function LaserNeedle({
  isPlaying,
  progress,
  hop,
  hopMs,
}: {
  isPlaying: boolean
  progress: number
  hop: number
  hopMs: number
}) {
  const restAngle = -35
  const playAngle = -15 + progress * 20
  const base = isPlaying ? playAngle : restAngle

  return (
    <motion.div
      className="absolute z-20"
      style={{
        top: 6,
        right: 14,
        transformOrigin: "top right",
        width: 3,
        height: DISC_SIZE * 0.45,
      }}
      animate={{ rotate: base + hop }}
      transition={{
        duration: hop !== 0 ? hopMs / 1000 : 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="absolute -top-1 -right-0.5 w-2.5 h-2.5 rounded-full"
        style={{
          background: "rgba(43,166,27,0.3)",
          boxShadow: "0 0 8px rgba(43,166,27,0.5), 0 0 16px rgba(43,166,27,0.2)",
        }}
      />
      <div
        className="absolute top-1.5 right-0 w-[1.5px] rounded-full"
        style={{
          height: "calc(100% - 6px)",
          background:
            "linear-gradient(to bottom, rgba(43,166,27,0.1), rgba(43,166,27,0.8), rgba(43,166,27,1))",
          boxShadow: "0 0 4px rgba(43,166,27,0.6), 0 0 8px rgba(43,166,27,0.3)",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-[-2px] w-1.5 h-1.5 rounded-full"
        style={{
          background: "#2ba61b",
          boxShadow: "0 0 6px #2ba61b, 0 0 12px rgba(43,166,27,0.6)",
        }}
        animate={
          isPlaying
            ? { scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }
            : { scale: 1, opacity: 0.4 }
        }
        transition={
          isPlaying
            ? { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : {}
        }
      />
    </motion.div>
  )
}

/* ─────────────── Holographic Shimmer ─────────────── */
function HolographicShimmer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
      animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
      transition={
        isPlaying
          ? { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }
          : { duration: 1 }
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(43,166,27,0.03) 30deg,
            transparent 60deg,
            rgba(255,255,255,0.02) 90deg,
            transparent 120deg,
            rgba(43,166,27,0.04) 180deg,
            transparent 210deg,
            rgba(255,255,255,0.02) 270deg,
            transparent 300deg,
            rgba(43,166,27,0.03) 330deg,
            transparent 360deg
          )`,
        }}
      />
    </motion.div>
  )
}

/* ─────────────── Outer groove skip hit zones ─────────────── */
function GrooveSkip({
  side,
  onSkip,
}: {
  side: "prev" | "next"
  onSkip: () => void
}) {
  const isPrev = side === "prev"
  return (
    <button
      type="button"
      aria-label={isPrev ? "前の溝" : "次の溝"}
      onClick={(e) => {
        e.stopPropagation()
        onSkip()
      }}
      className="absolute top-1/2 z-40 -translate-y-1/2 flex items-center justify-center"
      style={{
        [isPrev ? "left" : "right"]: -4,
        width: 44,
        height: 44,
      }}
      data-hover
    >
      <span
        className="block rounded-full transition-opacity opacity-40 hover:opacity-90"
        style={{
          width: 3,
          height: 28,
          background:
            "linear-gradient(to bottom, transparent, rgba(43,166,27,0.9), transparent)",
          boxShadow: "0 0 8px rgba(43,166,27,0.45)",
        }}
      />
    </button>
  )
}

/* ═══════════════════════════════════════════ */
/*              MAIN COMPONENT                */
/* ═══════════════════════════════════════════ */
export function FloatingPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible] = useState(true)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const [needleHop, setNeedleHop] = useState(0)
  const [hopMs, setHopMs] = useState(200)
  const [titleKey, setTitleKey] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const srcLoadedRef = useRef(false)
  const currentTrackRef = useRef(0)
  const isPlayingRef = useRef(false)
  const preloadRef = useRef<HTMLAudioElement | null>(null)
  const { freqs, init, start, stop, resume, dip } = useAudioAnalyser(audioRef)

  currentTrackRef.current = currentTrack
  isPlayingRef.current = isPlaying

  const track = tracks[currentTrack]
  const trackLabel = `${String(currentTrack + 1).padStart(2, "0")} / ${String(tracks.length).padStart(2, "0")}`

  const triggerHop = useCallback((wrap = false) => {
    const ms = wrap ? 280 : 200
    setHopMs(ms)
    setNeedleHop(wrap ? 12 : 10)
    window.setTimeout(() => setNeedleHop(0), ms)
  }, [])

  const preloadNext = useCallback((index: number) => {
    const next = tracks[(index + 1) % tracks.length]
    if (!preloadRef.current) preloadRef.current = new Audio()
    const el = preloadRef.current
    if (el.src.endsWith(next.src)) return
    el.preload = "auto"
    el.src = next.src
  }, [])

  const loadAndMaybePlay = useCallback(
    (index: number, shouldPlay: boolean) => {
      const audio = audioRef.current
      if (!audio) return
      const next = tracks[index]
      setIsLoading(true)
      setLoadError(false)
      setProgress(0)
      audio.src = next.src
      audio.preload = "auto"
      audio.load()
      srcLoadedRef.current = true
      preloadNext(index)

      const onCanPlay = () => {
        audio.removeEventListener("canplaythrough", onCanPlay)
        audio.removeEventListener("error", onError)
        setIsLoading(false)
        if (shouldPlay) {
          init()
          resume()
          audio
            .play()
            .then(() => {
              start()
              setIsPlaying(true)
            })
            .catch(() => setIsPlaying(false))
        }
      }
      const onError = () => {
        audio.removeEventListener("canplaythrough", onCanPlay)
        audio.removeEventListener("error", onError)
        setIsLoading(false)
        setLoadError(true)
        srcLoadedRef.current = false
      }
      audio.addEventListener("canplaythrough", onCanPlay)
      audio.addEventListener("error", onError)
      if (audio.readyState >= 3) onCanPlay()
    },
    [init, resume, start, preloadNext]
  )

  const skipTo = useCallback(
    (direction: -1 | 1) => {
      const from = currentTrackRef.current
      const next = (from + direction + tracks.length) % tracks.length
      const wrap =
        (direction === 1 && from === tracks.length - 1) ||
        (direction === -1 && from === 0)
      triggerHop(wrap)
      dip(150)
      setTitleKey((k) => k + 1)
      setCurrentTrack(next)
      loadAndMaybePlay(next, isPlayingRef.current)
    },
    [triggerHop, dip, loadAndMaybePlay]
  )

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      stop()
      setIsPlaying(false)
      return
    }

    const playWhenReady = () => {
      init()
      resume()
      audio
        .play()
        .then(() => {
          start()
          setIsPlaying(true)
          setIsLoading(false)
          setLoadError(false)
          preloadNext(currentTrackRef.current)
        })
        .catch(() => setIsLoading(false))
    }

    if (!srcLoadedRef.current) {
      loadAndMaybePlay(currentTrackRef.current, true)
    } else {
      playWhenReady()
    }
  }, [isPlaying, init, start, stop, resume, loadAndMaybePlay, preloadNext])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const handleEnded = () => {
      skipTo(1)
    }
    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [skipTo])

  // First-open needle hop hint
  useEffect(() => {
    if (isCollapsed) return
    try {
      if (sessionStorage.getItem(HINT_KEY)) return
      sessionStorage.setItem(HINT_KEY, "1")
    } catch {
      return
    }
    const t = window.setTimeout(() => triggerHop(false), 600)
    return () => clearTimeout(t)
  }, [isCollapsed, triggerHop])

  // Keyboard ← → when expanded
  useEffect(() => {
    if (isCollapsed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        skipTo(-1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        skipTo(1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isCollapsed, skipTo])

  const ringDuration = isPlaying ? 2.2 : 4
  const progressDeg = progress * 360

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed z-50"
            style={{
              // Home indicator / notch: keep disc + groove-skip clear of system edges
              bottom:
                "max(1.5rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
              right:
                "max(1.5rem, calc(env(safe-area-inset-right, 0px) + 0.75rem))",
            }}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{
              delay: 2,
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* ── Collapsed mini-button ── */}
            <AnimatePresence>
              {isCollapsed && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setIsCollapsed(false)}
                  className="relative w-12 h-12 rounded-full flex items-center justify-center"
                  data-hover
                  aria-label={isPlaying ? "プレイヤーを開く（再生中）" : "プレイヤーを開く"}
                  style={{
                    background: "rgba(10,10,10,0.85)",
                    border: "1px solid rgba(43,166,27,0.3)",
                    boxShadow: isPlaying
                      ? "0 0 24px rgba(43,166,27,0.28), 0 4px 20px rgba(0,0,0,0.5)"
                      : "0 0 20px rgba(43,166,27,0.15), 0 4px 20px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* progress arc when playing */}
                  {isPlaying && (
                    <svg
                      className="absolute inset-[-3px] pointer-events-none"
                      viewBox="0 0 54 54"
                      aria-hidden
                    >
                      <circle
                        cx="27"
                        cy="27"
                        r="25"
                        fill="none"
                        stroke="rgba(43,166,27,0.15)"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="27"
                        cy="27"
                        r="25"
                        fill="none"
                        stroke="rgba(43,166,27,0.85)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray={`${(progressDeg / 360) * 157} 157`}
                        transform="rotate(-90 27 27)"
                      />
                    </svg>
                  )}
                  <motion.div
                    className="absolute inset-[-2px] rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, rgba(43,166,27,${isPlaying ? 0.55 : 0.4}), transparent)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: ringDuration,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <div className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/90" />
                  {isPlaying ? (
                    <span
                      className="relative z-10 w-1.5 h-1.5 rounded-full bg-primary"
                      style={{ boxShadow: "0 0 8px #2ba61b" }}
                    />
                  ) : (
                    <Play className="w-4 h-4 text-primary relative z-10 ml-0.5" />
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Expanded ── */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="relative"
                    style={{
                      width: DISC_SIZE + 60,
                      height: DISC_SIZE + 60,
                    }}
                  >
                    <GrooveSkip side="prev" onSkip={() => skipTo(-1)} />
                    <GrooveSkip side="next" onSkip={() => skipTo(1)} />

                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: DISC_SIZE + 30,
                        height: DISC_SIZE + 30,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={
                        isPlaying
                          ? {
                              boxShadow: [
                                "0 0 40px rgba(43,166,27,0.06), 0 0 80px rgba(43,166,27,0.02)",
                                "0 0 60px rgba(43,166,27,0.12), 0 0 120px rgba(43,166,27,0.04)",
                                "0 0 40px rgba(43,166,27,0.06), 0 0 80px rgba(43,166,27,0.02)",
                              ],
                            }
                          : {
                              boxShadow:
                                "0 0 30px rgba(43,166,27,0.03), 0 0 60px rgba(43,166,27,0.01)",
                            }
                      }
                      transition={
                        isPlaying
                          ? {
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }
                          : {}
                      }
                    />

                    <CircularVisualizer freqs={freqs} />

                    <div
                      className="absolute"
                      style={{
                        width: DISC_SIZE,
                        height: DISC_SIZE,
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <LaserNeedle
                        isPlaying={isPlaying}
                        progress={progress}
                        hop={needleHop}
                        hopMs={hopMs}
                      />

                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={
                          isPlaying
                            ? {
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                              }
                            : { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
                        }
                        style={{
                          background:
                            "radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 40%, rgba(255,255,255,0.01) 70%, transparent 100%)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          boxShadow:
                            "inset 0 0 20px rgba(255,255,255,0.02), 0 0 1px rgba(255,255,255,0.1)",
                        }}
                      >
                        <DiscGrooves />
                        <HolographicShimmer isPlaying={isPlaying} />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            onClick={togglePlay}
                            disabled={isLoading}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center z-30 disabled:opacity-70 disabled:cursor-wait"
                            whileHover={!isLoading ? { scale: 1.15 } : undefined}
                            whileTap={!isLoading ? { scale: 0.9 } : undefined}
                            data-hover
                            style={{
                              background:
                                "radial-gradient(circle, rgba(43,166,27,0.12), rgba(10,10,10,0.95))",
                              border: "1px solid rgba(43,166,27,0.25)",
                              boxShadow: isPlaying
                                ? "0 0 16px rgba(43,166,27,0.3), 0 0 32px rgba(43,166,27,0.1)"
                                : "0 0 8px rgba(43,166,27,0.1)",
                            }}
                          >
                            <div className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/90" />
                            {isLoading ? (
                              <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin relative z-10" />
                            ) : isPlaying ? (
                              <Pause className="w-4 h-4 text-primary relative z-10" />
                            ) : (
                              <Play className="w-4 h-4 text-primary relative z-10 ml-0.5" />
                            )}
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Track info */}
                  <div className="flex flex-col items-center mt-1 w-full max-w-[160px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${titleKey}-${track.id}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full"
                      >
                        <div
                          className="text-[10px] font-sans tracking-wider text-center leading-tight w-full"
                          style={{ color: "rgba(43,166,27,0.75)" }}
                        >
                          <ScrollingTitle>{track.title}</ScrollingTitle>
                        </div>
                        {track.feat ? (
                          <p
                            className="text-[8px] font-sans tracking-wider text-center mt-0.5"
                            style={{ color: "rgba(255,255,255,0.28)" }}
                          >
                            feat. {track.feat}
                          </p>
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                    <p
                      className="text-[9px] font-mono tracking-widest mt-1 tabular-nums"
                      style={{ color: "rgba(43,166,27,0.45)" }}
                    >
                      {trackLabel}
                    </p>
                    {loadError && (
                      <p className="text-[9px] text-amber-400/90 mt-1 text-center">
                        音源を読み込めません
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <motion.button
                      onClick={toggleMute}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      data-hover
                      aria-label={isMuted ? "ミュート解除" : "ミュート"}
                      style={{
                        background: "rgba(10,10,10,0.7)",
                        border: "1px solid rgba(43,166,27,0.12)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3 h-3 text-primary/50" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-primary/50" />
                      )}
                    </motion.button>

                    <motion.button
                      onClick={() => setIsCollapsed(true)}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      data-hover
                      aria-label="折りたたむ（再生は続く）"
                      style={{
                        background: "rgba(10,10,10,0.7)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="text-[10px] text-foreground/30">&times;</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
