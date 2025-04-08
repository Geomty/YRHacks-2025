import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    rollupOptions: {
      treeshake: false
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
    topLevelAwait(),
  ],
  server: {
    hmr: false,
    port: 1024
  }
})
