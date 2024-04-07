import typescript from "@rollup/plugin-typescript";
// import postcss from "rollup-plugin-postcss";
// import css from "rollup-plugin-css-only";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "react-gemini-ai-chatbot",
  },
  external: ["react", "react-dom"],
  plugins: [
    typescript({ tsconfig: "tsconfig.json" }),
    // css({ output: "style.css" }),
    // postcss({
    //   plugins: [],
    //   minimize: true,
    //   extract: true,
    //   extensions: [".css"],
    // }),
  ],
});
