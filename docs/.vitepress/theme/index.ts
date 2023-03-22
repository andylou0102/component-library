import DefaultTheme from 'vitepress/theme'
import { createI18n } from 'vue-i18n'
import Playground from '../../../src/components/Playground.vue'

import './reset.scss'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'zh-TW',
  messages: {},
})


export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.component(Playground.name, Playground)
    app.use(i18n)
  },
}