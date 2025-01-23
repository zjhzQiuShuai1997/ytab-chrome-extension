import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import webExtension from '@samrum/vite-plugin-web-extension';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import path, { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import UnoCSS from 'unocss/vite';
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
      UnoCSS(),
      vue(),
      webExtension({
        manifest: {
          ...manifest
        }
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
        // 指定symbolld格式
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    define: {
      'process.env': {}
    },
    server: {
      host: '0.0.0.0',
      port: 3090,
      strictPort: true,
      open: false
    },
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `@use './src/styles/variables' as *;`,
          api: 'modern-compiler' // 或者使用 "modern"
        }
      }
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src') // 路径别名
        },
        { find: 'components', replacement: '/src/components' }
      ],
      extensions: ['.js', '.json', '.ts'] // 使用路径别名时想要省略的后缀名，可以自己 增减
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
