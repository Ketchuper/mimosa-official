"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Music2 } from "lucide-react";

type SocialLink = {
  href: string;
  label: string;
  icon: "instagram" | "tiktok" | "youtube" | "music";
};

type CrewMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  imageBack?: string;
  social: SocialLink[];
};

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function SocialIcons({ links, className }: { links: SocialLink[]; className?: string }) {
  if (links.length === 0) return null;
  return (
    <div className={`flex items-center gap-2 flex-wrap ${className ?? ""}`}>
      {links.map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors duration-300 border border-white/10 hover:border-primary/40 bg-black/30 hover:bg-primary/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          data-hover
        >
          {link.icon === "instagram" && <InstagramIcon className="w-4 h-4" />}
          {link.icon === "tiktok" && <TikTokIcon className="w-4 h-4" />}
          {link.icon === "youtube" && <YoutubeIcon className="w-4 h-4" />}
          {link.icon === "music" && <Music2 className="w-4 h-4" />}
        </motion.a>
      ))}
    </div>
  );
}

const crewData: CrewMember[] = [
  {
    id: 1,
    name: "Da-win",
    role: "Rapper",
    image: "/images/da-win.png",
    social: [
      { href: "https://www.instagram.com/da_win7/", label: "Instagram", icon: "instagram" },
      { href: "https://www.tunecore.co.jp/artists?id=1025502&lang=ja", label: "Music (TuneCore)", icon: "music" },
    ],
  },
  {
    id: 2,
    name: "Yuto Ishizawa",
    role: "Influencer / Artist",
    image: "/images/yuto-front.png",
    imageBack: "/images/yuto-back.png",
    social: [
      { href: "https://www.tiktok.com/@yuto.utauta", label: "TikTok", icon: "tiktok" },
      { href: "https://www.instagram.com/yuto.kamera/", label: "Instagram", icon: "instagram" },
      { href: "https://www.youtube.com/@thesantasゆうと/shorts", label: "YouTube Shorts", icon: "youtube" },
      { href: "https://www.tunecore.co.jp/artists/yuto.utauta?lang=ja", label: "Music (TuneCore)", icon: "music" },
    ],
  },
  {
    id: 3,
    name: "Teihen Influencer",
    role: "Creator",
    image: "/images/teihen.png",
    social: [
      { href: "https://www.instagram.com/teihen.influencer/", label: "Instagram", icon: "instagram" },
    ],
  },
  {
    id: 4,
    name: "Masaru",
    role: "Creator",
    image: "/images/masaru.png",
    social: [
      { href: "https://www.instagram.com/masaru.influencer/", label: "Instagram", icon: "instagram" },
      { href: "https://www.tiktok.com/@masaru.influencer", label: "TikTok", icon: "tiktok" },
    ],
  },
];

function DaWinCard({ member }: { member: CrewMember }) {
  const [hovered, setHovered] = useState(false);
  const [bars] = useState(() => Array.from({ length: 24 }, () => Math.random()));

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-card aspect-square cursor-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0">
        <Image
          src={member.image}
          alt={`${member.name}`}
          fill
          unoptimized
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 h-36 flex items-end justify-center gap-[2px] px-8 pb-16">
        {bars.map((seed, i) => (
          <motion.div
            key={i}
            className="w-[5px] rounded-t-sm origin-bottom"
            style={{
              background: `linear-gradient(to top, #2ba61b, rgba(43,166,27,0.2))`,
            }}
            animate={
              hovered
                ? {
                    scaleY: [
                      0.15 + seed * 0.3,
                      0.4 + seed * 0.6,
                      0.1 + seed * 0.2,
                      0.5 + seed * 0.5,
                      0.15 + seed * 0.3,
                    ],
                    height: "100%",
                  }
                : { scaleY: 0.08, height: "100%" }
            }
            transition={
              hovered
                ? {
                    duration: 0.4 + seed * 0.4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.02,
                  }
                : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <SocialIcons links={member.social} className="mb-3" />
        <motion.h3
          className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground"
          animate={{
            textShadow: hovered
              ? "0 0 20px #2ba61b, 0 0 40px #2ba61b"
              : "0 0 0px transparent",
          }}
          transition={{ duration: 0.6 }}
        >
          {member.name.toUpperCase()}
        </motion.h3>
        <p className="text-muted-foreground text-sm mt-1 tracking-wider uppercase">
          {member.role}
        </p>
      </div>

      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "inset 0 0 60px rgba(43,166,27,0.12), 0 0 40px rgba(43,166,27,0.08)"
            : "inset 0 0 0px transparent, 0 0 0px transparent",
        }}
        transition={{ duration: 0.6 }}
        style={{
          border: hovered ? "1px solid rgba(43,166,27,0.4)" : "1px solid transparent",
        }}
      />
    </motion.div>
  );
}

function YutoCard({ member }: { member: CrewMember }) {
  const [flipped, setFlipped] = useState(false);
  const backImage = member.imageBack ?? member.image;

  return (
    <div
      className="relative aspect-square cursor-none"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      data-hover
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex flex-col justify-end"
          style={{ backfaceVisibility: "hidden", pointerEvents: flipped ? "none" : "auto" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={member.image}
              alt={member.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[#2ba61b]/[0.05] pointer-events-none" />
          <div className="relative p-6 z-20">
            <SocialIcons links={member.social} className="mb-3" />
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground">
              {member.name.toUpperCase().split(" ")[0]}
            </h3>
            <p className="text-muted-foreground text-sm mt-1 tracking-wider uppercase">
              {member.role}
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-lg overflow-hidden flex flex-col justify-end"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            pointerEvents: flipped ? "auto" : "none",
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={backImage}
              alt={`${member.name} - back`}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-red-900/[0.1] mix-blend-multiply pointer-events-none" />
          <div className="relative p-6 z-20">
            <SocialIcons links={member.social} className="mb-3" />
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground">
              {member.name.toUpperCase()}
            </h3>
            <p className="text-red-400/80 text-sm mt-1 tracking-wider uppercase">
              The Raw Artist
            </p>
          </div>
          <div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              border: "1px solid rgba(220,38,38,0.3)",
              boxShadow: "inset 0 0 40px rgba(220,38,38,0.08)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function TeihenCard({ member }: { member: CrewMember }) {
  const [hovered, setHovered] = useState(false);
  const [glitch, setGlitch] = useState({
    x: 0,
    y: 0,
    scanY: 0,
    slice1: 0,
    slice2: 0,
    slice3: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 16,
        scanY: Math.random() * 100,
        slice1: Math.random() * 100,
        slice2: Math.random() * 100,
        slice3: Math.random() * 100,
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-card aspect-square cursor-none group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hover
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0">
        <Image
          src={member.image}
          alt={member.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

      <div
        className="absolute inset-0 mix-blend-screen opacity-60 overflow-hidden"
        style={{ transform: `translate(${glitch.x}px, ${glitch.y}px)` }}
      >
        <div className="absolute inset-0">
          <Image
            src={member.image}
            alt=""
            fill
            unoptimized
            className="object-cover"
            style={{ filter: "saturate(0) brightness(0.5)", opacity: 0.4 }}
          />
        </div>
        <div className="absolute inset-0 bg-red-500/30" />
      </div>
      <div
        className="absolute inset-0 mix-blend-screen opacity-60 overflow-hidden"
        style={{ transform: `translate(${-glitch.x}px, ${-glitch.y}px)` }}
      >
        <div className="absolute inset-0">
          <Image
            src={member.image}
            alt=""
            fill
            unoptimized
            className="object-cover"
            style={{ filter: "saturate(0) brightness(0.5)", opacity: 0.4 }}
          />
        </div>
        <div className="absolute inset-0 bg-cyan-500/30" />
      </div>

      <div
        className="absolute left-0 right-0 h-[3px]"
        style={{
          top: `${glitch.scanY}%`,
          background: "rgba(43,166,27,0.6)",
          boxShadow:
            "0 0 15px rgba(43,166,27,0.4), 0 -5px 20px rgba(43,166,27,0.1), 0 5px 20px rgba(43,166,27,0.1)",
        }}
      />
      {hovered && (
        <>
          <div
            className="absolute left-0 right-0 h-[8px] bg-[#2ba61b]/10"
            style={{
              top: `${glitch.slice1}%`,
              transform: `translateX(${glitch.x * 2}px)`,
            }}
          />
          <div
            className="absolute left-0 right-0 h-[4px] bg-red-500/10"
            style={{
              top: `${glitch.slice2}%`,
              transform: `translateX(${-glitch.x * 3}px)`,
            }}
          />
          <div
            className="absolute left-0 right-0 h-[6px] bg-cyan-500/10"
            style={{
              top: `${glitch.slice3}%`,
              transform: `translateX(${glitch.x * 1.5}px)`,
            }}
          />
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <SocialIcons links={member.social} className="mb-3" />
        <motion.h3
          className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground"
          style={{
            textShadow: "2px 0 #ff0000, -2px 0 #00ffff",
          }}
        >
          {member.name.toUpperCase()}
        </motion.h3>
        <p className="text-muted-foreground text-sm mt-1 tracking-wider uppercase">
          {member.role}
        </p>
      </div>

      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          border: "1px solid rgba(43,166,27,0.2)",
          boxShadow: hovered
            ? "inset 0 0 40px rgba(43,166,27,0.08)"
            : "none",
        }}
      />
    </motion.div>
  );
}

function MasaruCard({ member }: { member: CrewMember }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg bg-[#050505] aspect-square cursor-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      data-hover
    >
      <div className="absolute inset-0 bg-[#050505]" />
      {!imageError && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${member.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: hovered ? 1 : 0,
            maskImage: hovered
              ? `radial-gradient(circle 100px at ${mouse.x}px ${mouse.y}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`
              : "none",
            WebkitMaskImage: hovered
              ? `radial-gradient(circle 100px at ${mouse.x}px ${mouse.y}px, black 0%, rgba(0,0,0,0.6) 40%, transparent 100%)`
              : "none",
          }}
        />
      )}
      {/* Hidden img to detect load error and trigger fallback */}
      <img
        src={member.image}
        alt=""
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        onError={() => setImageError(true)}
      />
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Music2 className="w-12 h-12 text-primary/50" />
          </div>
        </div>
      )}
      {hovered && (
        <div
          className="absolute w-[250px] h-[250px] rounded-full pointer-events-none mix-blend-soft-light"
          style={{
            left: mouse.x - 125,
            top: mouse.y - 125,
            background:
              "radial-gradient(circle, rgba(43,166,27,0.08) 0%, transparent 70%)",
          }}
        />
      )}
      <AnimatePresence>
        {!hovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-foreground/[0.06] text-6xl font-[var(--font-display)] tracking-[0.3em] uppercase">
              ???
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* MASARU: 名前・SNS・役職は常に表示 */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <SocialIcons links={member.social} className="mb-3" />
        <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground">
          {member.name.toUpperCase()}
        </h3>
        <p className="text-red-400/60 text-sm mt-1 tracking-wider uppercase">
          {member.role}
        </p>
      </div>
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-500"
        style={{
          border: hovered
            ? "1px solid rgba(220,38,38,0.2)"
            : "1px solid rgba(255,255,255,0.03)",
        }}
      />
    </motion.div>
  );
}

const CARD_COMPONENTS = [DaWinCard, YutoCard, TeihenCard, MasaruCard] as const;

export function CrewSection() {
  return (
    <section id="crew" className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            THE <span className="text-primary neon-glow">CREW</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 tracking-[0.2em] uppercase">
            個性が交差する、MIMO$Aのクリエイティブ・コア。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crewData.map((member, index) => {
            const CardComponent = CARD_COMPONENTS[index] ?? DaWinCard;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <CardComponent member={member} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
