module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --max-warnings=0", () => "tsc-files --noEmit"],
  "*.test.{js,jsx,ts,tsx}": ["vitest run", () => "tsc-files --noEmit"],
};
