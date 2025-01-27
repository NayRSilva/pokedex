import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {},
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/setup.ts'],
  },
  server: {
    port: 3000,
  },
});
