"use client";

import { useState, useEffect } from "react";
import { getKanjiInfo, extractKanji } from "@/lib/kanji";
import KanjiResult from "@/components/KanjiResult";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<ReturnType<typeof getKanjiInfo>[]>([]);
  const [easyMode, setEasyMode] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [showUnicode, setShowUnicode] = useState(false);
  const [showDictLink, setShowDictLink] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // URLパラメータを確認してかんたんモードを設定
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const easyParam = params.get("easy");

    if (easyParam === "true") {
      setEasyMode(true);
      setLargeText(true);
      setShowDictLink(true);
    }
  }, []);

  const handleSearch = () => {
    const kanjiList = extractKanji(searchText);
    // 重複する漢字を除外する
    const uniqueKanjiList = kanjiList.filter(
      (kanji, index) => kanjiList.indexOf(kanji) === index
    );
    const kanjiResults = uniqueKanjiList.map((kanji) => getKanjiInfo(kanji));
    setResults(kanjiResults);
    setHasSearched(true);
  };

  const description = easyMode
    ? "ぶんのなかにあるかん字を、いつならうか、わかります。"
    : "文章を入力すると、その文章に含まれる漢字を、小学校〜中学校のどの学年で習うか分割して表示します。";

  const placeholder = easyMode
    ? "ぶんをいれてください"
    : "漢字を含む文章を入力";
  const searchButtonText = easyMode ? "🔍️" : "検索";
  const largeTextLabel = easyMode ? "大きくする" : "漢字を大きく表示";
  const showUnicodeLabel = easyMode ? "ユニコード" : "Unicodeを表示";
  const showDictLinkLabel = easyMode
    ? "じてんリンク"
    : "漢字辞典ONLINEへのリンクを表示する";

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-2">このかんじ、いつならう？</h1>
      <div className="w-full max-w-3xl mb-4">
        <p className="text-sm text-gray-500 mb-4 text-center">{description}</p>
        <div className="flex mb-2">
          <textarea
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 p-2 border rounded-l resize-none bg-white text-black"
            placeholder={placeholder}
            rows={3}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 rounded-r flex items-center"
          >
            {searchButtonText}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-4 text-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="easyMode"
              checked={easyMode}
              onChange={(e) => {
                const newEasyMode = e.target.checked;
                setEasyMode(newEasyMode);
                // かんたんモードがONになったときは自動的に大きい表示と辞書リンクをONにする
                if (newEasyMode) {
                  setLargeText(true);
                  setShowDictLink(true);
                }
              }}
              className="w-4 h-4"
            />
            <label htmlFor="easyMode" className="text-sm">
              かんたんモード
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="largeText"
              checked={largeText}
              onChange={(e) => setLargeText(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="largeText" className="text-sm">
              {largeTextLabel}
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showUnicode"
              checked={showUnicode}
              onChange={(e) => setShowUnicode(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="showUnicode" className="text-sm">
              {showUnicodeLabel}
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showDictLink"
              checked={showDictLink}
              onChange={(e) => setShowDictLink(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="showDictLink" className="text-sm">
              {showDictLinkLabel}
            </label>
          </div>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">
            {easyMode ? "けっか" : "検索結果"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {results.map((result, index) => (
              <KanjiResult
                key={index}
                kanji={result.kanji}
                level={result.level as "elementary" | "junior_high" | "unknown"}
                grade={result.grade as number | "3_equivalent" | null}
                description={result.description}
                easyMode={easyMode}
                largeText={largeText}
                showUnicode={showUnicode}
                showDictLink={showDictLink}
              />
            ))}
          </div>
        </div>
      ) : hasSearched ? (
        <div className="w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">
            {easyMode ? "けっか" : "検索結果"}
          </h2>
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
            <p className="text-lg text-gray-500">
              {easyMode ? "かん字がありません" : "漢字がありません"}
            </p>
          </div>
        </div>
      ) : null}

      <footer className="w-full max-w-3xl mt-8 text-xs text-gray-400">
        <p className="mb-1">免責事項</p>
        <p className="mb-1">
          ・小学校で習う漢字は、文部科学省の「学習指導要領『生きる力』」に掲載されている「
          <a
            href="https://www.mext.go.jp/a_menu/shotou/new-cs/youryou/syo/koku/001.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            別表 学年別漢字配当表
          </a>
          」を元に設定しています。
        </p>
        <p>
          ・中学校で習う漢字は「
          <a
            href="https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kakuki/14/pdf/jyouyou_kanjihyou.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            常用漢字表
          </a>
          」に掲載されている 2,136 字から、小学校で学習する漢字を網羅した「
          <a
            href="https://www.mext.go.jp/a_menu/shotou/new-cs/youryou/syo/koku/001.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            別表 学年別漢字配当表
          </a>
          」記載の 1,006 字を省いた 1,130
          字となりますが、学年配当の定めはありません。 中学校一学年あたりでは
          300〜400
          字の学習目標があります。当サイトでは漢字の難易度や使用頻度など独自の判断により、中学校で習う漢字については「中学生が習う漢字です。」「中学校卒業相当の漢字です。」と分けて表示しています。
          これらの判断によって生じた損害・被害等には対応致しかねますので、予めご了承下さい。
        </p>
      </footer>
    </main>
  );
}
