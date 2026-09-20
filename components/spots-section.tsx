"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSectionTitles } from "@/lib/i18n";

type Spot = {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  url?: string;
  comingSoon?: boolean;
};

const spotsData: Spot[] = [
  {
    id: 1,
    name: "MIMO$A KOZA",
    location: "沖縄市",
    category: "アパレル＆カルチャー",
    image: "/images/spots/mimosa.png",
    url: "https://maps.app.goo.gl/797o4TCYbXZWMYn26",
  },
  {
    id: 2,
    name: "MIMO$A NAGO",
    location: "名護市",
    category: "ミュージックバー",
    image: "/images/spots/replica.png",
    url: "https://maps.app.goo.gl/AGW5uiUUDS81NQBi9",
  },
  {
    id: 3,
    name: "MIMO$A GATE2",
    location: "沖縄市",
    category: "和牛サンド＆ミュージックバー",
    image: "/images/spots/gate2.jpg",
    comingSoon: true,
  },
  {
    id: 4,
    name: "豚豚豚 -TON TON TON-",
    location: "金武町",
    category: "ラーメン",
    image: "/images/spots/tontonton.png",
    url: "https://maps.app.goo.gl/Z81XyhimC7eao5wF9",
  },
  {
    id: 5,
    name: "El, france",
    location: "名護市",
    category: "鉄板焼きステーキ",
    image: "/images/spots/elfrance.png",
    url: "https://maps.app.goo.gl/ULhgR68CNkTjPrjQA",
  },
];

function SpotCard({
  spot,
  index,
}: {
  spot: Spot;
  index: number;
}) {
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group relative rounded-lg overflow-hidden border border-primary/[0.14] bg-card transition-all duration-500 ${
        spot.comingSoon
          ? "cursor-default opacity-95"
          : "hover:border-primary/40 hover:shadow-[0_0_30px_rgba(43,166,27,0.15)] cursor-pointer"
      }`}
      whileHover={spot.comingSoon ? undefined : { scale: 1.01 }}
      data-hover={spot.comingSoon ? undefined : true}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={spot.image}
          alt={spot.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            spot.comingSoon ? "" : "group-hover:scale-110"
          }`}
        />
        {spot.comingSoon ? (
          <>
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="font-[var(--font-display)] text-[11px] md:text-xs uppercase tracking-[0.55em] text-white/95">
                Coming Soon
              </span>
              <span
                aria-hidden="true"
                className="block h-px w-10 bg-white/40"
              />
            </div>
            <div className="absolute bottom-3 left-4">
              <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground rounded">
                {spot.location}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
            <div className="absolute bottom-3 left-4">
              <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/90 text-primary-foreground rounded">
                {spot.location}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="p-5">
        <h3
          className={`font-[var(--font-display)] text-xl md:text-2xl text-foreground transition-all duration-300 ${
            spot.comingSoon
              ? ""
              : "group-hover:text-primary group-hover:drop-shadow-[0_0_12px_rgba(43,166,27,0.8)]"
          }`}
        >
          {spot.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{spot.category}</p>
      </div>
    </motion.article>
  );

  if (spot.comingSoon || !spot.url) {
    return (
      <div key={spot.id} aria-disabled="true">
        {card}
      </div>
    );
  }

  return (
    <Link
      key={spot.id}
      href={spot.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {card}
    </Link>
  );
}

export function SpotsSection() {
  return (
    <section
      id="spots"
      className="py-24 md:py-32 px-4 md:px-8 bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/70 mb-2">
            Physical Shop
          </p>
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            {getSectionTitles().spots.prefix}
            <span className="text-primary neon-glow">
              {getSectionTitles().spots.highlight}
            </span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl">
            MIMO$Aが経営・運用する実店舗
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {spotsData.map((spot, index) => (
            <SpotCard key={spot.id} spot={spot} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
