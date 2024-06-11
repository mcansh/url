import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import ts from "typescript";

// load tsconfig file using typescript API
const tsconfig = "tsconfig.json";
const loaded = ts.readConfigFile(tsconfig, ts.sys.readFile);

if (loaded.error) {
  throw new Error(loaded.error.messageText.toString());
}

if (!loaded.config) {
  throw new Error("No config found");
}

export default defineConfig({
  build: {
    target: loaded.config.compilerOptions.target,
    lib: {
      entry: ["src/index.ts"],
      formats: ["es"],
    },
    sourcemap: true,
  },
  plugins: [dts()],
});
