import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from '@samrum/vite-plugin-web-extension';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { resolve } from 'path';
import manifest from './src/manifest';
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  console.log(mode, command);
  return defineConfig({
    root: './src/',
    base: '/',
    envDir: '../',
    publicDir: '../public',
    plugins: [
      vue(),
      webExtension({
        manifest: {
          ...manifest
        }
      })
    ],
    define: {
      'process.env': {}
    },
    server: {
      host: '0.0.0.0',
      port: 30,
      strictPort: true,
      open: true
    },
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      cssCodeSplit: true,
      sourcemap: true,
      // target: 'chrome-extension',
      rollupOptions: {
        input: {
          main: resolve(__dirname, './src/pages.html'),
          options: resolve(__dirname, './src/options.html'),
          pages: resolve(__dirname, './src/pages.html')
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/name-[hash].[ext]'
        },
        plugins: [nodePolyfills()]
      }
    }
  });
};
