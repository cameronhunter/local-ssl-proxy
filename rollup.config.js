import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";

/** @type {import('rollup').RollupOptions} */
const config = {
  input: "src/commandline.js",
  output: {
    file: "dist/commandline.js",
    format: "cjs",
    interop: "auto"
  },
  plugins: [babel({ babelHelpers: "bundled" }), json()],
  external: ["commander", "fs", "path", "process"]
};

export default config;
