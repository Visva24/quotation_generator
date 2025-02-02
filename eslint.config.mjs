import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ⛔ Disables 'any' restriction
      "@typescript-eslint/no-unused-vars": "off", // ✅ Fixed the extra space
      "react-hooks/exhaustive-deps": "off", // ✅ Correctly disables exhaustive-deps rule
    },
  },
];

export default eslintConfig;
