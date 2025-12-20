import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import json from '@rollup/plugin-json';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react(), json()],
  base: mode === 'development' ? '/' : '/silah-showcase/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
  },
}));
