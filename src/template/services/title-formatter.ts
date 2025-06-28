/**
 * Determines which words in a title should be highlighted
 * @param title The title string to analyze
 * @param pattern 'alternate' (every other word), 'bookend' (first and last), 'middle' (middle words)
 * @returns Array of indices representing which words should be highlighted
 */
export const getHighlightIndices = (
  title: string,
  pattern: "alternate" | "bookend" | "middle" = "alternate"
): number[] => {
  const words = title.split(" ");
  const indices: number[] = [];

  switch (pattern) {
    case "alternate":
      for (let i = 0; i < words.length; i++) {
        if (i % 2 === 1) indices.push(i);
      }
      break;
    case "bookend":
      if (words.length > 0) indices.push(0);
      if (words.length > 1) indices.push(words.length - 1);
      break;
    case "middle":
      for (let i = 1; i < words.length - 1; i++) {
        indices.push(i);
      }
      break;
  }

  return indices;
};
