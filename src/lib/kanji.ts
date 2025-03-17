import kanjiData from "@/data/kanji.json";

export type KanjiLevel = "elementary" | "junior_high" | "unknown";
export type ElementaryGrade =
  | "grade1"
  | "grade2"
  | "grade3"
  | "grade4"
  | "grade5"
  | "grade6";

export type JuniorHighGrade =
  | "grade1"
  | "grade2"
  | "grade3"
  | "grade3_equivalent";

type KanjiData = {
  elementary: {
    [key in ElementaryGrade]: string[];
  };
  junior_high: {
    [key in JuniorHighGrade]: string[];
  };
};

const typedKanjiData = kanjiData as unknown as KanjiData;

/**
 * 文字列から漢字を抽出する
 * @param text 抽出対象の文字列
 * @returns 抽出された漢字の配列
 */
export function extractKanji(text: string): string[] {
  // 漢字のUnicode範囲: 0x4E00-0x9FFF
  const kanjiRegex = /[\u4E00-\u9FFF]/g;
  return text.match(kanjiRegex) || [];
}

/**
 * 漢字が学習される学校レベルを判定する
 * @param kanji 判定する漢字
 * @returns 学校レベル（小学校、中学校、不明）
 */
export function getKanjiLevel(kanji: string): KanjiLevel {
  // 小学校の各学年をチェック
  for (const grade of Object.keys(
    typedKanjiData.elementary
  ) as ElementaryGrade[]) {
    if (typedKanjiData.elementary[grade].includes(kanji)) {
      return "elementary";
    }
  }

  // 中学校をチェック
  for (const grade of Object.keys(
    typedKanjiData.junior_high
  ) as JuniorHighGrade[]) {
    if (typedKanjiData.junior_high[grade].includes(kanji)) {
      return "junior_high";
    }
  }

  return "unknown";
}

/**
 * 小学校の漢字の場合、何年生で習うかを返す
 * @param kanji 判定する漢字
 * @returns 学年（1-6）または null（小学校で習わない場合）
 */
export function getElementaryGrade(kanji: string): number | null {
  for (let i = 1; i <= 6; i++) {
    const grade = `grade${i}` as ElementaryGrade;
    if (typedKanjiData.elementary[grade].includes(kanji)) {
      return i;
    }
  }
  return null;
}

/**
 * 中学校の漢字の場合、何年生で習うかを返す
 * @param kanji 判定する漢字
 * @returns 学年（1-3）または "grade3_equivalent" または null（中学校で習わない場合）
 */
export function getJuniorHighGrade(
  kanji: string
): number | "grade3_equivalent" | null {
  // 中学3年生相当をチェック
  if (typedKanjiData.junior_high.grade3_equivalent.includes(kanji)) {
    return "grade3_equivalent";
  }

  // 中学1-3年生をチェック
  for (let i = 1; i <= 3; i++) {
    const grade = `grade${i}` as JuniorHighGrade;
    if (typedKanjiData.junior_high[grade].includes(kanji)) {
      return i;
    }
  }
  return null;
}

/**
 * 漢字の詳細情報を取得する
 * @param kanji 判定する漢字
 * @returns 漢字の詳細情報
 */
export function getKanjiInfo(kanji: string) {
  const level = getKanjiLevel(kanji);
  // 漢字の読み仮名マップ（一部の漢字のみ）
  const kanjiReadings: Record<string, string> = {
    // 小学1年生
    一: "いち",
    二: "に",
    三: "さん",
    四: "よん・し",
    五: "ご",
    六: "ろく",
    七: "なな・しち",
    八: "はち",
    九: "きゅう・く",
    十: "じゅう",
    百: "ひゃく",
    千: "せん",
    万: "まん",
    円: "えん",
    玉: "たま",
    王: "おう",
    // 小学2年生
    父: "ちち",
    母: "はは",
    // 小学3年生
    悪: "わる・あく",
    // 小学4年生
    愛: "あい",
    // 小学5年生
    圧: "あつ",
    // 小学6年生
    異: "こと・い",
    // 中学1年生
    哀: "あわ・あい",
    // 中学2年生
    挨: "あい",
    // 中学3年生
    曖: "あい",
    // 中学3年生相当
    握: "あく・にぎ",
  };

  // 読み仮名を取得（なければ空文字列）
  const reading = kanjiReadings[kanji] || "";

  if (level === "elementary") {
    const grade = getElementaryGrade(kanji);
    return {
      kanji,
      level,
      grade,
      description: `小学${grade}年生で習う漢字です。`,
      reading,
    };
  } else if (level === "junior_high") {
    const grade = getJuniorHighGrade(kanji);
    if (grade === "grade3_equivalent") {
      return {
        kanji,
        level,
        grade: "3_equivalent",
        description: "中学3年生相当の漢字です。",
        reading,
      };
    } else if (grade !== null) {
      return {
        kanji,
        level,
        grade,
        description: `中学${grade}年生で習う漢字です。`,
        reading,
      };
    }
  }

  return {
    kanji,
    level,
    grade: null,
    description: "小・中学校の教育漢字ではありません。",
    reading,
  };
}

/**
 * 漢字の学年に応じた文字色を取得する
 * @param level 学校レベル
 * @param grade 学年
 * @returns 文字色のクラス名
 */
export function getGradeColor(
  level: KanjiLevel,
  grade: number | "3_equivalent" | null
): string {
  if (level === "elementary" && typeof grade === "number") {
    return "text-blue-500"; // 小学生は濃い青
  } else if (level === "junior_high") {
    return "text-green-600"; // 中学生は濃い緑
  }
  return "text-gray-700";
}
