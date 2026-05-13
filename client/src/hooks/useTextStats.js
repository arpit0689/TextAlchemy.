import { useMemo } from "react";

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

export const useTextStats = (text) => {
  return useMemo(
    () => ({
      words: countWords(text),
      characters: text.length
    }),
    [text]
  );
};
