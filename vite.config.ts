import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['lodash', 'framer-motion']
        }
      }
    }
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
});
