"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Spot = {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
};

const spotsData: Spot[] = [
  {
    id: 1,
    name: "MIMO$A KOZA",
    location: "沖縄市",
    category: "アパレル＆カルチャー",
    image: "/images/spots/mimosa.png",
  },
  {
    id: 2,
    name: "豚豚豚 -TON TON TON-",
    location: "金武町",
    category: "ラーメン",
    image: "/images/spots/tontonton.png",
  },
  {
    id: 3,
    name: "Bar CHURA kin",
    location: "金武町",
    category: "カラオケバー",
    image: "/images/spots/churakin.png",
  },
  {
    id: 4,
    name: "BAR REPLICA",
    location: "名護市",
    category: "ミュージックバー",
    image: "/images/spots/replica.png",
  },
  {
    id: 5,
    name: "El, france",
    location: "名護市",
    category: "鉄板焼きステーキ",
    image: "/images/spots/elfrance.png",
  },
];

export function SpotsSection() {
  return (
    <section
      id="spots"
      className="py-24 md:py-32 px-4 md:px-8 bg-[#0a0a0a] text-foreground"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
            Physical Spots
          </p>
          <h2 className="font-[var(--font-display)] text-4xl md:text-6xl text-white">
            OUR <span className="text-[#2ba61b]">SPOTS</span>
          </h2>
          <p className="text-white/60 text-sm mt-3 max-w-xl">
            MIMO$Aクルーが展開・サポートする実店舗
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {spotsData.map((spot, index) => (
            <motion.article
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-black/50 transition-all duration-300 hover:border-[#2ba61b]/40 hover:shadow-[0_0_30px_rgba(43,166,27,0.15)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#2ba61b]/90 text-white rounded">
                    {spot.location}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-[var(--font-display)] text-xl md:text-2xl text-white transition-all duration-300 group-hover:text-[#2ba61b] group-hover:drop-shadow-[0_0_12px_rgba(43,166,27,0.8)]">
                  {spot.name}
                </h3>
                <p className="text-sm text-white/60 mt-1">{spot.category}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
