import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "このかんじ、いつならう？",
  description:
    "文章に含まれる漢字を、小学校〜中学校のどの学年で習うか分割して表示します。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <main className="min-h-screen p-4 md:p-8">{children}</main>
      </body>
    </html>
  );
}
