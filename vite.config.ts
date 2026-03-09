import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, splitVendorChunkPlugin} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      splitVendorChunkPlugin(),
      react(),
      tailwindcss(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      // split large bundles into chunks and adjust warning threshold
      // vendor chunk still ~1.3MB after splitting; silence warning up to 2MB
      chunkSizeWarningLimit: 2000, // kB
      rollupOptions: {
        output: {
          // ensure chunk file names never include absolute paths
          chunkFileNames: (chunkInfo) => {
            const base = chunkInfo.name ? path.basename(chunkInfo.name) : 'chunk';
            return `${base}-[hash].js`;
          },
          manualChunks(id) {
            if (typeof id !== 'string') return;
            // carve out big known libraries into their own chunks
            if (id.includes('node_modules/html2canvas')) return 'html2canvas';
            if (id.includes('node_modules/purify')) return 'purify';
            if (id.includes('src/pages')) {
              // separate each page into its own chunk
              return path.basename(id).replace(/\.[jt]sx?$/, '');
            }
          }
        }
      }
    }
  };
});
