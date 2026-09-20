"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    id: 3,
    name: "Teihen Influencer",
    role: "Creator",
    image: "/images/teihen.png",
    social: [
      { href: "https://www.instagram.com/teihen.influencer/", label: "Instagram", icon: "instagram" },
    ],
  },
];

function DaWinCard({ member, priority }: { member: CrewMember; priority?: boolean }) {
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
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
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
          {member.name}
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

function TeihenCard({ member, priority }: { member: CrewMember; priority?: boolean }) {
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
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
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
            sizes="(max-width: 768px) 100vw, 50vw"
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
            sizes="(max-width: 768px) 100vw, 50vw"
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
          {member.name}
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

const CARD_BY_ID: Record<number, typeof DaWinCard> = {
  1: DaWinCard,
  3: TeihenCard,
};

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
            const CardComponent = CARD_BY_ID[member.id] ?? DaWinCard;
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
                <CardComponent member={member} priority={index < 2} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
