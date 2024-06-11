import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { loadTsConfig } from "load-tsconfig";

const loaded = loadTsConfig(".");

export default defineConfig({
  build: {
    target: loaded.data.compilerOptions.target,
    lib: {
      entry: ["src/index.ts"],
      formats: ["es"],
    },
    sourcemap: true,
  },
  plugins: [dts()],
});
