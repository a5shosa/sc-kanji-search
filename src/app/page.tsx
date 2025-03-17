"use client";

import { useState } from "react";
import { getKanjiInfo, extractKanji } from "@/lib/kanji";
import KanjiResult from "@/components/KanjiResult";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<ReturnType<typeof getKanjiInfo>[]>([]);
  const [easyMode, setEasyMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const handleSearch = () => {
    const kanjiList = extractKanji(searchText);
    const kanjiResults = kanjiList.map((kanji) => getKanjiInfo(kanji));
    setResults(kanjiResults);
  };

  const description = easyMode
    ? "ぶんしょうにあるかん字を、いつならうか、わかります。"
    : "文章を入力すると、その文章に含まれる漢字を、小学校〜中学校のどの学年で習うか分割して表示します。";

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-2">このかんじ、いつならう？</h1>
      <div className="w-full max-w-3xl mb-4">
        <p className="text-sm text-gray-500 mb-4 text-center">{description}</p>
        <div className="flex mb-2">
          <textarea
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 p-2 border rounded-l resize-none"
            placeholder="漢字を含む文章を入力"
            rows={3}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 rounded-r flex items-center"
          >
            検索
          </button>
        </div>
        <div className="flex items-center gap-6 mb-4">
          <label className="inline-flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                id="easyMode"
                checked={easyMode}
                onChange={(e) => setEasyMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-500 group-hover:border-blue-400"></div>
              <div className="absolute top-[2px] left-[3px] w-2 h-3 border-r-2 border-b-2 border-white transform rotate-45 opacity-0 peer-checked:opacity-100"></div>
            </div>
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              かんたんモード（小学1年生向け）
            </span>
          </label>
          <label className="inline-flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                id="largeText"
                checked={largeText}
                onChange={(e) => setLargeText(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-blue-500 peer-checked:bg-blue-500 group-hover:border-blue-400"></div>
              <div className="absolute top-[2px] left-[3px] w-2 h-3 border-r-2 border-b-2 border-white transform rotate-45 opacity-0 peer-checked:opacity-100"></div>
            </div>
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              漢字を大きく表示
            </span>
          </label>
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {results.map((result, index) => (
            <KanjiResult
              key={index}
              kanji={result.kanji}
              level={result.level as "elementary" | "junior_high" | "unknown"}
              grade={result.grade as number | "3_equivalent" | null}
              description={result.description}
              reading={result.reading}
              easyMode={easyMode}
              largeText={largeText}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
