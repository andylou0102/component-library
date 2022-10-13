import DefaultTheme from 'vitepress/theme'
import Playground from '../../../src/components/Playground.vue'

import './reset.scss'

export default {
  ...DefaultTheme,
  enhanceApp ({ app }) {
    app.component(Playground.name, Playground)
  },
}