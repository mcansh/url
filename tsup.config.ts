import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    builder: "src/lib/builder.ts",
    url: "src/lib/url.ts",
  },
  dts: true,
  format: ["esm"],
  tsconfig: "tsconfig.json",
  sourcemap: true,
  clean: true,
});
