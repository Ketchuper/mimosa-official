import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // LAN 上のケータイ等から http://192.168.x.x:3000 で開くとき、
  // Next 16 が /_next/* をクロスオリジン拒否するため許可する
  allowedDevOrigins: [
    "192.168.11.21",
    "127.0.0.1",
    "localhost",
  ],
};

export default nextConfig;
