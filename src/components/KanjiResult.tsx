import React from "react";
import { getGradeColor } from "@/lib/kanji";
import { convertToHiragana } from "@/lib/hiragana";

export type KanjiResultProps = {
  kanji: string;
  level: "elementary" | "junior_high" | "unknown";
  grade: number | "3_equivalent" | null;
  description: string;
  easyMode: boolean;
  largeText?: boolean;
  showUnicode?: boolean;
  showDictLink?: boolean;
};

export default function KanjiResult({
  kanji,
  level,
  grade,
  description,
  easyMode,
  largeText = false,
  showUnicode = false,
  showDictLink = false,
}: KanjiResultProps) {
  // 文字色を直接指定
  const textColorClass =
    level === "elementary"
      ? "text-slate-700"
      : level === "junior_high"
      ? "text-slate-700"
      : "text-slate-700";

  // Unicodeコードポイントを取得
  const unicodePoint = kanji.codePointAt(0)?.toString(16).toUpperCase();

  // 漢字辞典URLの生成
  const dictionaryUrl = `https://kanji.jitenon.jp/cat/search?getdata=-${encodeURIComponent(
    kanji
  )}-&search=contain&how=%E3%81%99%E3%81%B9%E3%81%A6`;

  return (
    <div className="border rounded-md p-3 bg-white shadow-sm">
      <div className="flex items-start">
        <div
          className={`${
            largeText ? "text-7xl" : "text-5xl"
          } font-serif font-black ${textColorClass}`}
        >
          {kanji}
        </div>
        <div className="ml-3 text-base text-gray-600 pt-1">
          {easyMode ? convertToHiragana(description) : description}
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-end items-center gap-2 text-[10px] text-gray-400">
          {showUnicode && unicodePoint && <span>U+{unicodePoint}</span>}
          {showDictLink && (
            <a
              href={dictionaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:text-green-600 transition-colors"
              title="漢字辞典で詳細を見る"
            >
              📗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
