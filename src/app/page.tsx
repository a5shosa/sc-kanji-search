"use client";

import { useState } from "react";
import { getKanjiInfo, extractKanji } from "@/lib/kanji";
import KanjiResult from "@/components/KanjiResult";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<ReturnType<typeof getKanjiInfo>[]>([]);

  const handleSearch = () => {
    const kanjiList = extractKanji(searchText);
    const newResults = kanjiList.map((kanji) => getKanjiInfo(kanji));
    setResults(newResults);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">SC Kanji Search</h1>
        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="漢字を入力してください"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            検索
          </button>
        </div>
        <div className="space-y-4">
          {results.map((result, index) => (
            <KanjiResult key={index} {...result} />
          ))}
        </div>
      </div>
    </main>
  );
}
