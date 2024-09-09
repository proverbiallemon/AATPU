import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  assetsInclude: ['**/*.webp'],
})