import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  base: "/spain-portugal-trip/",
  plugins: [react(), tailwindcss(), imagetools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@img": fileURLToPath(new URL("./img", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    assetsInlineLimit: 0,
  },
});
