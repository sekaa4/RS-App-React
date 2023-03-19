/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    clearMocks: true,
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      include: ['src/*/'],
      exclude: ['src/*.{ts,tsx}', 'src/models/*.{ts,tsx}'],
      enabled: true,
      provider: 'c8', // or istanbul'
      all: true,
      skipFull: true,
      reporter: 'text',
    },
  },
  server: {
    open: true,
  },
  css: {
    devSourcemap: true,
  },
});
