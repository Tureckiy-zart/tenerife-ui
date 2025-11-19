export default {
  "**/*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix", "eslint --max-warnings=0"],
  "**/*.{json,md,css,html}": ["prettier --write"],
};
