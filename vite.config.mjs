import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  base: '',
  publicDir: './public',
  resolve: {
    alias: {
      '@': './src',
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: true,
    // esbuild JSX configuration
    jsx: true,
    // esbuild loader configuration
    loader: {
      '.js': 'jsx',
    },
      },
  test: {
    include: ['src/**/*.test.js', 'src/**/*.spec.js'],
    environment: 'jsdom',
  },
})