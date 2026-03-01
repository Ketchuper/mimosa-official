"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type MediaCategory = "MUSIC VIDEO" | "YOUTUBE SHORTS";

type MediaItem = {
  id: number;
  title: string;
  videoId: string;
  category: MediaCategory;
};

// フォールバック用の静的データ（API が失敗した場合に使用）
const FALLBACK_MEDIA: MediaItem[] = [
  {
    id: 1,
    title: "Yuto Ishizawa 1st Single「#ポンコツ」MV",
    videoId: "lCy4vK0thvs",
    category: "MUSIC VIDEO",
  },
  {
    id: 2,
    title: "1週間ワンパンマンのトレーニングしたら人間の体はどうなるか？！",
    videoId: "6lTvoEFjBnE",
    category: "YOUTUBE SHORTS",
  },
  {
    id: 3,
    title: "Da-win 「Fly」 (Official Audio)",
    videoId: "dummy_id_darwin",
    category: "MUSIC VIDEO",
  },
];


export function MediaSection() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(FALLBACK_MEDIA);

  useEffect(() => {
    let cancelled = false;

    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/media");
        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled && Array.isArray(data.items) && data.items.length) {
          setMediaItems(data.items as MediaItem[]);
        }
      } catch {
        // 失敗時はフォールバックのまま
      }
    };

    fetchMedia();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="media" className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 text-neon-green text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              LATEST DROPS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase">
              MIMO$A <span className="text-neon-green">MEDIA</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg">
              Check out our latest music videos, behind the scenes, and chaos.
            </p>
          </div>
          <Link
            href="https://www.youtube.com/@thesantas%E3%82%86%E3%81%86%E3%81%A8"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-neon-green transition-colors"
          >
            VIEW ALL ON YOUTUBE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* 1行表示・PCで3〜4枚見えるサイズ・はみ出た分は横スクロール */}
        <div className="flex flex-nowrap gap-4 md:gap-5 overflow-x-auto pb-2 -mx-4 px-4 md:mx-4 md:px-4 snap-x snap-mandatory">
          {mediaItems.map((item) => (
            <Link
              key={item.id}
              href={`https://www.youtube.com/watch?v=${item.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group shrink-0 w-[75vw] min-w-[240px] md:w-[calc((100%-3rem)/4)] md:min-w-[220px] md:max-w-[280px] snap-center"
            >
              <Card className="bg-secondary/50 border-white/5 overflow-hidden transition-all duration-300 hover:border-neon-green/50 h-full">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    {/* YouTubeからサムネイル画像（maxresdefault.jpg）を直接引っ張ってくる処理 */}
                    <img
                      src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        // 高画質サムネがない場合は標準画質に切り替える保険処理
                        e.currentTarget.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 rounded-full bg-neon-green flex items-center justify-center text-black transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 md:p-4">
                    <h3 className="text-base md:text-lg font-bold line-clamp-2 group-hover:text-neon-green transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Link
          href="https://www.youtube.com/@thesantas%E3%82%86%E3%81%86%E3%81%A8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex md:hidden items-center justify-center gap-2 text-sm font-medium hover:text-neon-green transition-colors mt-8"
        >
          VIEW ALL ON YOUTUBE
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}