
import { defineConfig } from 'vitepress'
import { readdirSync } from 'fs'
import { join } from 'path'
import { capitalize, kebabCase } from 'lodash'

export default defineConfig({
  lang: 'zh-TW',
  title: 'Component Library',
  description: 'Vue 3 component library',

  themeConfig: {
    sidebar: [
      {
        text: 'Components',
        items: readdirSync(join(__dirname, '../guide')).map((name) => ({
          text: kebabCase(name).split('-').map((word) => capitalize(word)).join(' '),
          link: `/guide/${name}/index.html`,
        })),
      },
    ],
  },
})
