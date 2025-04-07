import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
    topLevelAwait(),
  ],
  server: {
    hmr: false,
    port: 1024
  }
})
