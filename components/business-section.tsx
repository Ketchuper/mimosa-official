"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type BusinessItem = {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
};

const businessData: BusinessItem[] = [
  {
    id: 1,
    category: "CREATIVE UNIT & CONTENT STUDIO",
    title: "THE SANTAS",
    description:
      "「本気の悪ふざけ」を極めるクリエイティブ・ユニット。音楽と映像を掛け合わせ、規格外のイベント企画から日常のショート動画まで、あらゆる事象をエンタメコンテンツとして世界へ発信。独自プラットフォームでのプレミアム配信網の構築も見据える、MIMO$Aの中核をなすコンテンツファクトリー。",
    image: "/images/business/THE%20SANTAS.png",
  },
  {
    id: 2,
    category: "APPAREL & CULTURE",
    title: "MIMO$A KOZA",
    description:
      "沖縄市コザから発信する『古着 × 音楽』のコンセプトショップ。ストリートカルチャーを体現するアパレル展開と、コミュニティの拠点としての場作りを両立。",
    image: "/images/business/MIMO%24A%20KOZA.png",
  },
  {
    id: 3,
    category: "GLOBAL EVENT",
    title: "WWSA (世界スイカ割り協会)",
    description:
      "『スイカ割り』を戦略的スポーツへ昇華。高度な感覚遮断と身体操作を競う、言語不要のグローバル・エンターテインメント・スポーツの興行を展開。",
    image: "/images/business/WWSA.png",
  },
  {
    id: 4,
    category: "GLOBAL EVENT",
    title: "G.R.A.S.C. (世界ジョイントロール選手権)",
    description:
      "『指先のF1』。デジタル疲れの現代において、0.01gの精度を競うアナログ技術（エンジニアリング・スポーツ）の祭典を世界規模でプロデュース。",
    image: "/images/business/G.R.A.S.C..png",
  },
];

export function BusinessSection() {
  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            OUR <span className="text-primary neon-glow">BUSINESS</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businessData.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative overflow-hidden rounded-lg bg-card min-h-[420px] md:min-h-[480px] cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.01 }}
                data-hover
              >
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.08] brightness-[0.5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/20" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                  <p className="text-xs font-medium uppercase tracking-widest text-primary/90 mb-2">
                    {item.category}
                  </p>
                  <h3 className="font-[var(--font-display)] text-4xl md:text-5xl text-foreground mb-3 leading-tight">
                    <span className="text-primary neon-glow">{item.title}</span>
                  </h3>
                  <p className="text-muted-foreground max-w-md leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
