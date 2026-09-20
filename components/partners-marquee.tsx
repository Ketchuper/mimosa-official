"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Partner = {
  id: number;
  name: string;
  image: string;
};

/**
 * OFFICIAL PARTNER
 * - 1社1ロゴ。同じ image パスを複製・マーキー回ししない
 * - 旧スポンサー 7–17 は public/images/partners/ に残しアーカイブ
 */
const partnersData: Partner[] = [
  {
    id: 1,
    name: "長谷川ジンギスカン",
    image: "/images/partners/hasegawa-seinikuten.png",
  },
];

export function PartnersMarquee() {
  return (
    <section className="py-16 md:py-24 bg-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="px-4 md:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-10 md:mb-12">
            OFFICIAL PARTNER
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {partnersData.map((partner) => (
              <div
                key={partner.id}
                className="relative h-24 md:h-32 flex items-center justify-center"
              >
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={280}
                  height={128}
                  className="h-full w-auto object-contain object-center opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
