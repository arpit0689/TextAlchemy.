const splitSentences = (text) => {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?]+[.!?]*/g) || [];
};

export const summarizeText = async (text) => {
  const sentences = splitSentences(text);
  const targetCount = Math.max(1, Math.ceil(sentences.length * 0.35));
  return sentences.slice(0, targetCount).join(" ").trim();
};

export const humanizeText = async (text) => {
  const replacements = [
    [/\butilize\b/gi, "use"],
    [/\btherefore\b/gi, "so"],
    [/\bfurthermore\b/gi, "also"],
    [/\bsubsequently\b/gi, "then"],
    [/\bendeavor\b/gi, "try"]
  ];

  const conversational = replacements.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    text
  );

  return `Here's a clearer, more natural version:\n\n${conversational.trim()}`;
};

export const rewriteText = async (text) => {
  const sentences = splitSentences(text);
  return sentences
    .map((sentence) => {
      const cleaned = sentence.trim();
      if (!cleaned) return "";
      return cleaned
        .replace(/\bimportant\b/gi, "essential")
        .replace(/\bgood\b/gi, "strong")
        .replace(/\bbad\b/gi, "weak")
        .replace(/\bhelp\b/gi, "support");
    })
    .join(" ")
    .trim();
};

export const fixGrammarText = async (text) => {
  let fixed = text
    .replace(/\bi\b/g, "I")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();

  fixed = fixed.replace(/(^\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());

  if (fixed && !/[.!?]$/.test(fixed)) {
    fixed += ".";
  }

  return fixed;
};

export const processTextByType = async (type, text) => {
  const processors = {
    summarize: summarizeText,
    humanize: humanizeText,
    rewrite: rewriteText,
    grammar: fixGrammarText
  };

  const processor = processors[type];

  if (!processor) {
    throw new Error("Unsupported text processing type.");
  }

  return processor(text);
};
