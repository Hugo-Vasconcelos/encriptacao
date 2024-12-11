export const analyzeText = (text) => {
  const spaceCount = (text.match(/ /g) || []).length;
  const letterCount = {};
  const specialCharCount = (text.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
  const wordCount = (text.trim().split(/\s+/)).length;

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      letterCount[char] = (letterCount[char] || 0) + 1;
    }
  }

  return { spaceCount, wordCount, letterCount, specialCharCount };
};