"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getSectionTitles } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

export function BusinessSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section className="bg-background overflow-hidden">
      {/* ─── OUR BUSINESS 見出し ─── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            {getSectionTitles().business.prefix}
            <span className="text-primary neon-glow">
              {getSectionTitles().business.highlight}
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ─── MIMO$A APPAREL 紹介 ─── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-10 md:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-primary/90 mb-3">
            APPAREL & CULTURE
          </p>
          <h3 className="font-[var(--font-display)] text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            <span className="text-primary neon-glow">MIMO$A APPAREL</span>
          </h3>
          <p className="text-muted-foreground max-w-lg leading-relaxed">
            古着 × 音楽を軸に、コザの路地から発信するストリートカルチャー。厳選されたヴィンテージと独自のオリジナルピースが混在する、MIMO$Aクルーの美学そのもの。
          </p>
        </motion.div>
      </div>

      {/* ─── ルックブック（コンテンツ幅・3:2） ─── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div
          ref={heroRef}
          className="relative w-full aspect-[3/2] overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ y: heroY }}
          >
            <Image
              src="/images/business/apparel-look4.jpg"
              alt="MIMO$A APPAREL — Okinawa City night"
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ─── 非対称マガジングリッド ─── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-3 md:pt-4 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-2 md:gap-3 md:aspect-[16/10]">
          {/* 左: クローズアップ — 縦長 */}
          <motion.div
            className="relative aspect-[2/3] md:aspect-auto md:col-span-5 md:row-span-2 overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
            whileHover={{ scale: 1.005 }}
          >
            <Image
              src="/images/business/apparel-look1.jpg"
              alt="MIMO$A APPAREL look"
              fill
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>

          {/* 右上 */}
          <motion.div
            className="relative aspect-[3/2] md:aspect-auto md:col-span-7 overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            whileHover={{ scale: 1.005 }}
          >
            <Image
              src="/images/business/apparel-look2.jpg"
              alt="MIMO$A APPAREL look"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>

          {/* 右下 */}
          <motion.div
            className="relative aspect-[3/2] md:aspect-auto md:col-span-7 overflow-hidden group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.16, ease }}
            whileHover={{ scale: 1.005 }}
          >
            <Image
              src="/images/business/apparel-look3.jpg"
              alt="MIMO$A APPAREL look"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
          </motion.div>
        </div>

        {/* CTA — 取扱店 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex justify-end"
        >
          <Link
            href="https://www.instagram.com/mimosa.koza/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-primary hover:text-primary/70 transition-colors"
          >
            取扱店 @mimosa.koza
            <span aria-hidden="true">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
