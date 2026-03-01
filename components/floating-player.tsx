"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

/* ─────────────── Constants ─────────────── */
const DISC_SIZE = 120
const GROOVE_COUNT = 8
const BAR_COUNT = 64
const FFT_SIZE = 128

const tracks = [
  {
    title: "Fly (feat. Bendy & DJ Fourd Nkay)",
    artist: "Da-win",
  },
]

/* ─────────────── useAudioAnalyser ─────────────── */
function useAudioAnalyser(audioRef: React.RefObject<HTMLAudioElement | null>) {
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const dataRef = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(new ArrayBuffer(FFT_SIZE / 2)))
  const rafRef = useRef<number>(0)
  const [freqs, setFreqs] = useState<number[]>(() => new Array(BAR_COUNT).fill(0))

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

  const start = useCallback(() => {
    if (!analyserRef.current) return
    const loop = () => {
      const analyser = analyserRef.current
      if (!analyser) return
      analyser.getByteFrequencyData(dataRef.current)
      const binCount = analyser.frequencyBinCount
      const step = binCount / BAR_COUNT
      const result: number[] = []
      for (let i = 0; i < BAR_COUNT; i++) {
        const idx = Math.floor(i * step)
        result.push(dataRef.current[idx] / 255)
      }
      setFreqs(result)
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

  return { freqs, init, start, stop }
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

/* ─────────────── Frequency-driven Circular Visualizer ─────────────── */
function CircularVisualizer({ freqs }: { freqs: number[] }) {
  const center = DISC_SIZE / 2
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
              filter: amp > 0.5 ? `drop-shadow(0 0 ${2 + amp * 4}px rgba(43,166,27,0.6))` : "none",
            }}
          />
        )
      })}
    </svg>
  )
}

/* ─────────────── Laser Needle ─────────────── */
function LaserNeedle({
  isPlaying,
  progress,
}: {
  isPlaying: boolean
  progress: number
}) {
  const restAngle = -35
  const playAngle = -15 + progress * 20

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
      animate={{ rotate: isPlaying ? playAngle : restAngle }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
          boxShadow:
            "0 0 4px rgba(43,166,27,0.6), 0 0 8px rgba(43,166,27,0.3)",
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
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 origin-bottom"
        animate={
          isPlaying
            ? { opacity: [0.1, 0.35, 0.1] }
            : { opacity: 0.05 }
        }
        transition={
          isPlaying
            ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : {}
        }
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
        }}
      />
    </motion.div>
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
  const [currentTrack] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { freqs, init, start, stop } = useAudioAnalyser(audioRef)

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return
    init()
    if (isPlaying) {
      audioRef.current.pause()
      stop()
    } else {
      audioRef.current.play().catch(() => {})
      start()
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying, init, start, stop])

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
    audio.addEventListener("timeupdate", handleTimeUpdate)
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  const track = tracks[currentTrack]

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/FLY_final.wav"
        preload="auto"
        loop
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed z-50"
            style={{ bottom: 24, right: 24 }}
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
                  style={{
                    background: "rgba(10,10,10,0.85)",
                    border: "1px solid rgba(43,166,27,0.3)",
                    boxShadow:
                      "0 0 20px rgba(43,166,27,0.15), 0 0 40px rgba(43,166,27,0.05), 0 4px 20px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <motion.div
                    className="absolute inset-[-2px] rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, rgba(43,166,27,0.4), transparent)`,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  <div className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/90" />
                  <Play className="w-4 h-4 text-primary relative z-10 ml-0.5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── Expanded holographic turntable ── */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* ── Disc area ── */}
                  <div
                    className="relative"
                    style={{
                      width: DISC_SIZE + 60,
                      height: DISC_SIZE + 60,
                    }}
                  >
                    {/* Ambient glow */}
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

                    {/* Frequency-driven circular visualizer (behind & around the disc) */}
                    <CircularVisualizer freqs={freqs} />

                    {/* Disc centered */}
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
                      {/* Laser needle */}
                      <LaserNeedle isPlaying={isPlaying} progress={progress} />

                      {/* Spinning glass disc */}
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

                        {/* ── Center: Play/Pause button ── */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.button
                            onClick={togglePlay}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center z-30"
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
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
                            <motion.div
                              className="absolute inset-[-1px] rounded-full pointer-events-none"
                              style={{
                                background: `conic-gradient(from 0deg, transparent 60%, rgba(43,166,27,0.4) 80%, transparent 100%)`,
                              }}
                              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                              transition={
                                isPlaying
                                  ? {
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "linear",
                                    }
                                  : { duration: 0.8 }
                              }
                            />
                            <div className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/90" />
                            {isPlaying ? (
                              <Pause className="w-4 h-4 text-primary relative z-10" />
                            ) : (
                              <Play className="w-4 h-4 text-primary relative z-10 ml-0.5" />
                            )}
                          </motion.button>
                        </div>
                      </motion.div>

                      {/* Wobble shadow */}
                      <motion.div
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                        style={{
                          width: DISC_SIZE * 0.6,
                          height: 6,
                          background:
                            "radial-gradient(ellipse, rgba(43,166,27,0.06), transparent)",
                          filter: "blur(4px)",
                        }}
                        animate={
                          isPlaying
                            ? { scaleX: [1, 1.05, 0.97, 1.03, 1] }
                            : { scaleX: 1 }
                        }
                        transition={
                          isPlaying
                            ? {
                                duration: 4,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }
                            : {}
                        }
                      />
                    </div>
                  </div>

                  {/* ── Track info ── */}
                  <div className="flex flex-col items-center mt-1 max-w-[160px]">
                    <motion.p
                      className="text-[10px] font-sans tracking-wider text-center leading-tight truncate w-full"
                      style={{ color: "rgba(43,166,27,0.7)" }}
                      animate={
                        isPlaying
                          ? { opacity: [0.6, 1, 0.6] }
                          : { opacity: 0.5 }
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
                    >
                      {track.title}
                    </motion.p>
                    <p
                      className="text-[9px] font-sans tracking-widest uppercase mt-0.5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {track.artist}
                    </p>
                  </div>

                  {/* ── Secondary controls row ── */}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {/* Mute */}
                    <motion.button
                      onClick={toggleMute}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      data-hover
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

                    {/* Collapse */}
                    <motion.button
                      onClick={() => {
                        setIsCollapsed(true)
                        if (isPlaying) {
                          audioRef.current?.pause()
                          setIsPlaying(false)
                          stop()
                        }
                      }}
                      className="w-7 h-7 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      data-hover
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
