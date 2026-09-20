/**
 * セクション見出しの多言語対応（英語対応用）
 * 言語切り替え時は LocaleProvider の locale を変更してください。
 */
export type Locale = "ja" | "en"

export const sectionTitles: Record<
  Locale,
  {
    business: { prefix: string; highlight: string }
    news: { prefix: string; highlight: string }
    spots: { prefix: string; highlight: string }
    apparel: { prefix: string; highlight: string }
    contact: string
  }
> = {
  en: {
    business: { prefix: "OUR ", highlight: "BUSINESS" },
    news: { prefix: "LATEST ", highlight: "NEWS" },
    spots: { prefix: "OUR ", highlight: "SHOP" },
    apparel: { prefix: "MIMO$A ", highlight: "APPAREL" },
    contact: "CONTACT",
  },
  ja: {
    business: { prefix: "OUR ", highlight: "BUSINESS" },
    news: { prefix: "LATEST ", highlight: "NEWS" },
    spots: { prefix: "OUR ", highlight: "SHOP" },
    apparel: { prefix: "MIMO$A ", highlight: "APPAREL" },
    contact: "CONTACT",
  },
}

/** 英語対応時用：日本語のセクション見出し（必要に応じて ja の値をこちらに差し替え可能） */
export const sectionTitlesJaAlt = {
  business: { prefix: "", highlight: "事業内容" },
  news: { prefix: "", highlight: "最新ニュース" },
  spots: { prefix: "", highlight: "ショップ" },
  apparel: { prefix: "", highlight: "アパレル" },
  contact: "お問い合わせ",
}

export const defaultLocale: Locale = "en"

export function getSectionTitles(locale: Locale = defaultLocale) {
  return sectionTitles[locale]
}
