"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

const INQUIRY_OPTIONS = [
  { value: "", label: "お問い合わせ種別を選択" },
  { value: "performance", label: "出演・パフォーマンス依頼" },
  { value: "sponsor", label: "スポンサー・協賛について" },
  { value: "media", label: "取材・メディア掲載" },
  { value: "apparel", label: "店舗・アパレルについて" },
  { value: "other", label: "その他" },
] as const;

const OFFICIAL_EMAIL = "sns@m-i-m-o-s-a.com";
const OFFICIAL_INSTAGRAM_URL = "https://www.instagram.com/mimosa.mybrain/";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function ContactSection() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${OFFICIAL_EMAIL}?subject=${encodeURIComponent(
      `[MIMO$A] ${INQUIRY_OPTIONS.find((o) => o.value === category)?.label ?? "お問い合わせ"}`
    )}&body=${encodeURIComponent(`お名前: ${name}\n\n${message}`)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="font-[var(--font-display)] text-5xl md:text-7xl text-foreground">
            CONTACT
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* 左: テキスト・メール・インスタ誘導 */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-muted-foreground leading-relaxed max-w-md">
              出演・協賛・取材・店舗など、各種お問い合わせはメールまたは公式Instagram（DM）まで。
            </p>

            <div className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-widest text-primary/80">
                公式メール
              </p>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300 group"
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center border border-primary/40 bg-primary/10 text-primary group-hover:border-primary/60 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <span className="font-mono text-lg tracking-wide">{OFFICIAL_EMAIL}</span>
              </a>
            </div>

            <div className="pt-4">
              <p className="text-xs font-medium uppercase tracking-widest text-primary/80 mb-4">
                公式Instagram（DMでご連絡）
              </p>
              <motion.a
                href={OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-8 py-5 rounded-lg border-2 border-primary/50 bg-primary/10 text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 group"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(43,166,27,0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                <span className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/20 text-primary group-hover:bg-primary/30">
                  <InstagramIcon className="w-8 h-8" />
                </span>
                <div className="text-left">
                  <span className="font-[var(--font-display)] text-2xl md:text-3xl text-primary neon-glow block">
                    @mimosa.mybrain
                  </span>
                  <span className="text-sm text-muted-foreground">
                    DMはこちらから
                  </span>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* 右: フォーム */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <label htmlFor="category" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                お問い合わせ種別
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-md border border-border bg-input text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              >
                {INQUIRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                お名前
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="お名前を入力"
                required
                className="w-full h-12 px-4 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
                メッセージ
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="お問い合わせ内容をご記入ください"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-md border border-border bg-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-y min-h-[120px]"
              />
            </div>

            <motion.button
              type="submit"
              className="w-full md:w-auto px-8 py-4 rounded-lg bg-primary text-primary-foreground font-[var(--font-display)] text-lg uppercase tracking-wider"
              whileHover={{
                boxShadow: "0 0 25px rgba(43,166,27,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              data-hover
            >
              メールで送信
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
