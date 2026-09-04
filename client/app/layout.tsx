import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "厚生年金サポートシステム_連動更新処理図解",
  description: "厚生年金事務サポートシステムにて基本マスタ検索画面での連動更新処理の図解",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
