declare module "@/data/kanji.json" {
  interface KanjiData {
    elementary: {
      grade1: string[];
      grade2: string[];
      grade3: string[];
      grade4: string[];
      grade5: string[];
      grade6: string[];
    };
    junior_high: string[];
  }

  const value: KanjiData;
  export default value;
}
