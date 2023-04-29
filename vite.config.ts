/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    clearMocks: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      include: ['src/*/'],
      exclude: ['src/*.{ts,tsx}', 'src/models/*.{ts,tsx}', 'src/**/*.cy.{ts,tsx}'],
      enabled: true,
      provider: 'c8', // or istanbul'
      all: true,
      skipFull: true,
      reporter: 'text',
    },
  },
  server: {
    open: true,
    port: 5173,
  },
  css: {
    devSourcemap: true,
  },
});
