/// <reference types="vitest" />
import path from 'path'
/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import AutoImportPlugin from 'unplugin-auto-import/vite'
import EslintPlugin from '@nabla/vite-plugin-eslint'
/* eslint-enable import/no-extraneous-dependencies */

export function defineViteConfig (isDocs = false) {
  const pathToRootDir = __dirname

  return defineConfig({
    css: {
      preprocessorOptions: {
        // define global scss variable
        scss: {
          additionalData: `
            @use 'sass:map';
            @import "@/lib/styles/variables";
          `,
        },
      },
    },
    plugins: [
      isDocs ? [] : [VuePlugin()],
      AutoImportPlugin({
        imports: [
          'vue',
        ],
        dts: path.join(pathToRootDir, 'src/typings/auto-import.d.ts'),
        eslintrc: {
          enabled: true,
        },
      }),
      EslintPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.join(pathToRootDir, 'src'),
      },
    },
    server: {
      port: 8000,
    },
    build: isDocs ? undefined : {
      lib: {
        entry: path.resolve(pathToRootDir, 'src/lib/index.ts'),
        name: 'ComponentUI',
        fileName: (format) => `component-ui.${format}.js`,
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
}

export default defineViteConfig()
