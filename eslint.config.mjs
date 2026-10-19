import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...coreWebVitals,
  ...typescript,
  { rules: { "@typescript-eslint/no-explicit-any": "error" } },
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];
export default config;
