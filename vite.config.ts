/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import AutoImportPlugin from 'unplugin-auto-import/vite'
import EslintPlugin from '@nabla/vite-plugin-eslint'

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
          `
        }
      }
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
  })
}

export default defineViteConfig()
