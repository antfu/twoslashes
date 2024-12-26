// https://vitepress.dev/guide/custom-theme
import type { EnhanceAppContext } from 'vitepress'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import Theme from 'vitepress/theme'

import '@shikijs/vitepress-twoslash/style.css'
import 'uno.css'
import './styles/index.scss'

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.use(TwoslashFloatingVue as any)
  },
}
