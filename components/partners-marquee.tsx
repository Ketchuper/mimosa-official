"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Partner = {
  id: number;
  name: string;
  image: string;
};

const partnersData: Partner[] = [
  { id: 1, name: "Sponsor 7", image: "/images/partners/7.png" },
  { id: 2, name: "Sponsor 8", image: "/images/partners/8.png" },
  { id: 3, name: "Sponsor 9", image: "/images/partners/9.png" },
  { id: 4, name: "Sponsor 10", image: "/images/partners/10.png" },
  { id: 5, name: "Sponsor 11", image: "/images/partners/11.png" },
  { id: 6, name: "Sponsor 12", image: "/images/partners/12.png" },
  { id: 7, name: "Sponsor 13", image: "/images/partners/13.png" },
  { id: 8, name: "Sponsor 14", image: "/images/partners/14.png" },
  { id: 9, name: "Sponsor 15", image: "/images/partners/15.png" },
  { id: 10, name: "Sponsor 16", image: "/images/partners/16.png" },
  { id: 11, name: "Sponsor 17", image: "/images/partners/17.png" },
];

export function PartnersMarquee() {
  const duplicated = [...partnersData, ...partnersData];

  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 md:mb-12 px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            OFFICIAL SPONSORS
          </p>
        </div>
      </motion.div>

      <div className="relative">
        {/* 左端フェード */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"
          aria-hidden
        />
        {/* 右端フェード */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"
          aria-hidden
        />

        <motion.div
          className="flex gap-12 md:gap-16 items-center shrink-0 w-max"
          animate={{
            x: [0, "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {duplicated.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex items-center shrink-0 group"
            >
              <div className="relative h-16 md:h-24 w-auto max-w-[180px] md:max-w-[240px] flex items-center justify-center">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={240}
                  height={96}
                  unoptimized
                  className="w-auto h-full object-contain object-center grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
