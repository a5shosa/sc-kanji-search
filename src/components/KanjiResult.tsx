import { getGradeColor } from "@/lib/kanji";

type KanjiResultProps = {
  kanji: string;
  level: "elementary" | "junior_high" | "unknown";
  grade: number | "3_equivalent" | null;
  description: string;
};

export default function KanjiResult({
  kanji,
  level,
  grade,
  description,
}: KanjiResultProps) {
  const textColor = getGradeColor(level, grade);
  const bgColor =
    level === "elementary"
      ? "bg-blue-200"
      : level === "junior_high"
      ? "bg-green-200"
      : "";

  return (
    <div className={`p-2 rounded-lg border-2 ${bgColor}`}>
      <div className={`text-xl font-bold mb-1 ${textColor}`}>{kanji}</div>
      <div className="text-sm text-gray-700">{description}</div>
    </div>
  );
}
