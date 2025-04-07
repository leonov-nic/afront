import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({floatPrecision: 2,}),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) {
            return 'react';
          }
          if (id.includes('node_modules/@mui/x-data-grid')) {
            return 'mui-x-data-grid';
          }
          if (id.includes('node_modules/@mui')) {
            return 'mui';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
