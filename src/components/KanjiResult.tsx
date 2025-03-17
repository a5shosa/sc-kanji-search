import { getGradeColor } from "@/lib/kanji";
import { convertToHiragana } from "@/lib/hiragana";

type KanjiResultProps = {
  kanji: string;
  level: "elementary" | "junior_high" | "unknown";
  grade: number | "3_equivalent" | null;
  description: string;
  reading?: string;
  easyMode?: boolean;
  largeText?: boolean;
};

export default function KanjiResult({
  kanji,
  level,
  grade,
  description,
  reading = "",
  easyMode = false,
  largeText = false,
}: KanjiResultProps) {
  // 文字色を直接指定
  const textColorClass =
    level === "elementary"
      ? "text-indigo-900"
      : level === "junior_high"
      ? "text-green-800"
      : "text-gray-700";

  // ボーダー色を文字色と同じにする
  const borderColorClass =
    level === "elementary"
      ? "border-indigo-900"
      : level === "junior_high"
      ? "border-green-800"
      : "border-gray-700";

  // かんたんモードの場合は説明文を平仮名に変換
  const displayDescription = easyMode
    ? convertToHiragana(description)
    : description;

  return (
    <div
      className={`p-2 rounded-lg border-2 ${borderColorClass} bg-white flex flex-col`}
    >
      <div className="flex justify-between items-center mb-1">
        <div
          className={`${
            largeText ? "text-5xl" : "text-3xl"
          } font-bold ${textColorClass} mr-2`}
        >
          {kanji}
        </div>
        <div className="text-sm text-gray-700 flex-1">{displayDescription}</div>
      </div>
      {reading && (
        <div className="text-[10px] text-gray-400 self-end">
          よみがな：{reading}
        </div>
      )}
    </div>
  );
}
