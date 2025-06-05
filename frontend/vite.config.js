import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../ATKApplication/wwwroot", // Куда складываем сборку
    emptyOutDir: true,
    rollupOptions: {
      input: {
        createEvent: path.resolve(__dirname, 'index.html'),
        events: path.resolve(__dirname, 'src/table/indexTable.html'),
        eventCard: path.resolve(__dirname, 'src/eventCard/eventCard.html'),
        loginPage: path.resolve(__dirname, 'src/Login/LoginPage.html')
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name]-chunk.js',
        assetFileNames: ({ name }) => {
          if (/\.(css)$/.test(name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|svg|gif)$/.test(name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[ext]/[name]-[hash][extname]';
        }
      }
      
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5237",
        changeOrigin: true,
        secure: false,
      },
    },
  }
  
});