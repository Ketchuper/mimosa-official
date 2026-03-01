import { NextResponse } from "next/server";

type MediaCategory = "MUSIC VIDEO" | "YOUTUBE SHORTS";

type MediaItem = {
  id: number;
  title: string;
  videoId: string;
  category: MediaCategory;
};

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

/** ハンドル（@xxx）からチャンネルIDを取得 */
async function resolveChannelId(
  apiKey: string,
  handle: string
): Promise<string | null> {
  const q = handle.startsWith("@") ? handle : `@${handle}`;
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "channel");
  url.searchParams.set("q", q);
  url.searchParams.set("maxResults", "1");

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  const channelId = data?.items?.[0]?.id?.channelId as string | undefined;
  return channelId ?? null;
}

/** チャンネルIDから「アップロード」プレイリストIDを取得 */
async function getUploadsPlaylistId(
  apiKey: string,
  channelId: string
): Promise<string | null> {
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("part", "contentDetails");
  url.searchParams.set("id", channelId);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  const data = await res.json();
  const uploadsId = data?.items?.[0]?.contentDetails?.relatedPlaylists
    ?.uploads as string | undefined;
  return uploadsId ?? null;
}

/** プレイリストの最新動画を取得（アップロード順） */
async function getPlaylistVideos(
  apiKey: string,
  playlistId: string,
  maxResults: number = 6
): Promise<MediaItem[]> {
  const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
  url.searchParams.set("key", apiKey);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("playlistId", playlistId);
  url.searchParams.set("maxResults", String(maxResults));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`playlistItems error: ${res.status}`);
  const data = await res.json();

  const items: MediaItem[] = (data.items ?? [])
    .map((item: { snippet?: { resourceId?: { videoId?: string }; title?: string } }, index: number): MediaItem | null => {
      const videoId = item?.snippet?.resourceId?.videoId;
      const title = item?.snippet?.title ?? "Untitled";
      if (!videoId) return null;
      const lowerTitle = title.toLowerCase();
      const category: MediaCategory =
        lowerTitle.includes("short") || lowerTitle.includes("ショート")
          ? "YOUTUBE SHORTS"
          : "MUSIC VIDEO";
      return { id: index + 1, title, videoId, category };
    })
    .filter((i: MediaItem | null): i is MediaItem => i !== null);

  return items;
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const channelHandle = process.env.YOUTUBE_CHANNEL_HANDLE; // 例: thesantasゆうと または @thesantasゆうと

  if (!apiKey) {
    return NextResponse.json({ items: FALLBACK_MEDIA });
  }

  let resolvedChannelId = channelId ?? null;
  if (!resolvedChannelId && channelHandle) {
    resolvedChannelId = await resolveChannelId(apiKey, channelHandle);
  }

  if (!resolvedChannelId) {
    return NextResponse.json({ items: FALLBACK_MEDIA });
  }

  try {
    const uploadsPlaylistId = await getUploadsPlaylistId(
      apiKey,
      resolvedChannelId
    );
    if (!uploadsPlaylistId) {
      return NextResponse.json({ items: FALLBACK_MEDIA });
    }

    const items = await getPlaylistVideos(apiKey, uploadsPlaylistId, 6);
    if (items.length === 0) {
      return NextResponse.json({ items: FALLBACK_MEDIA });
    }
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Failed to fetch YouTube media:", error);
    return NextResponse.json({ items: FALLBACK_MEDIA });
  }
}

