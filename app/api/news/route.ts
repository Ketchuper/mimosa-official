import { NextResponse } from "next/server"
import { newsData, type NewsItem, type NewsTag } from "@/lib/news"

export const dynamic = "force-dynamic"

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1oJ3hwsdLdiS9hFP-4otW7Tf2yoJgvttQNIRQqNDCov8/export?format=csv&gid=932943091"
const validTags = new Set<NewsTag>(["EVENT", "RELEASE", "VIDEO"])

function parseCsv(csv: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ""
  let quoted = false

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i]
    if (char === '"') {
      if (quoted && csv[i + 1] === '"') {
        cell += '"'
        i += 1
      } else {
        quoted = !quoted
      }
    } else if (char === "," && !quoted) {
      row.push(cell)
      cell = ""
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && csv[i + 1] === "\n") i += 1
      row.push(cell)
      if (row.some((value) => value.trim())) rows.push(row)
      row = []
      cell = ""
    } else {
      cell += char
    }
  }

  row.push(cell)
  if (row.some((value) => value.trim())) rows.push(row)
  return rows
}

function parseNews(csv: string): NewsItem[] {
  const rows = parseCsv(csv)
  const headerIndex = rows.findIndex((row) => row.includes("公開") && row.includes("公開日"))
  if (headerIndex < 0) throw new Error("ニュース管理シートの見出し行が見つかりません")

  const headers = rows[headerIndex]
  const statusColumn = headers.indexOf("公開")
  const dateColumn = headers.indexOf("公開日")
  const tagColumn = headers.indexOf("タグ")
  const titleColumn = headers.indexOf("タイトル")
  const urlColumn = headers.indexOf("リンクURL")

  return rows.slice(headerIndex + 1).flatMap((row, index) => {
    const status = row[statusColumn]?.trim()
    const rawDate = row[dateColumn]?.trim().replace(/[/-]/g, ".")
    const tag = row[tagColumn]?.trim() as NewsTag
    const title = row[titleColumn]?.trim()
    const url = row[urlColumn]?.trim()
    if (status !== "公開" || !rawDate || !title || !url || !validTags.has(tag)) return []
    if (!/^\d{4}\.\d{2}\.\d{2}$/.test(rawDate) || !/^https:\/\//i.test(url)) return []

    return [{ id: index + 1, date: rawDate, tag, title, url }]
  }).sort((a, b) => b.date.localeCompare(a.date))
}

export async function GET() {
  try {
    const response = await fetch(SHEET_CSV_URL, { cache: "no-store" })
    if (!response.ok) throw new Error(`Google Sheets returned ${response.status}`)
    const news = parseNews(await response.text())
    return NextResponse.json({ news, source: "sheet" })
  } catch (error) {
    console.error("Failed to load news from Google Sheets", error)
    return NextResponse.json({ news: newsData, source: "fallback" })
  }
}
