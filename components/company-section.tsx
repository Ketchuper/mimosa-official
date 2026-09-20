"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const companyFacts: Array<{
  label: string;
  value: string;
  href?: string;
}> = [
  {
    label: "代表取締役社長",
    value: "中原 大輔（Daisuke Nakahara）",
  },
  {
    label: "資本金",
    value: "1,000,000円",
  },
  {
    label: "所在地",
    value: "〒904-0032 沖縄県沖縄市諸見里1丁目25-8 ハピネスプラザビル702",
  },
  {
    label: "メール",
    value: "contact@m-i-m-o-s-a.com",
    href: "mailto:contact@m-i-m-o-s-a.com",
  },
];

export function CompanySection() {
  return (
    <section
      id="company"
      className="py-24 md:py-32 px-4 md:px-8 bg-background text-foreground"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            THE <span className="text-primary neon-glow">COMPANY</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl text-foreground mb-4">
              MIMO<span className="text-primary neon-glow">$</span>A
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              沖縄を拠点に、飲食・アパレル・エンターテインメントの店舗を運営しています。古着と音楽、食と夜の場づくりを通じて、街に残る場所をつくり続けています。
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="border-t border-primary/[0.12]"
          >
            {companyFacts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9rem_1fr] gap-3 sm:gap-4 border-b border-primary/[0.12] py-4"
              >
                <dt className="text-xs tracking-[0.12em] text-muted-foreground/70 pt-0.5">
                  {fact.label}
                </dt>
                <dd className="text-sm md:text-base text-foreground/90 leading-relaxed break-words">
                  {fact.href ? (
                    <a
                      href={fact.href}
                      className="hover:text-primary transition-colors"
                      data-hover
                    >
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
