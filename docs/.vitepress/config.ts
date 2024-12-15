/* eslint-disable antfu/no-top-level-await */
import type { DefaultTheme } from 'vitepress'
import antfu from '@antfu/eslint-config'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import { bundledThemes } from 'shiki'
import { createTwoslasher as createTwoslasherESLint } from 'twoslash-eslint'
import { createTwoslasher as createTwoslasherSvelte } from 'twoslash-svelte'
import { defineConfig } from 'vitepress'
import { version } from '../../package.json'
import vite from './vite.config'

const GUIDES: DefaultTheme.NavItemWithLink[] = [
  { text: 'Getting Started', link: '/guide/' },
  { text: 'Installation', link: '/guide/install' },
  { text: 'Syntax Highlighting', link: '/guide/highlight' },
  { text: 'Migration', link: '/guide/migrate' },
]

const REFERENCES: DefaultTheme.NavItemWithLink[] = [
  { text: 'Twoslash Notations', link: '/refs/notations' },
  { text: 'API References', link: '/refs/api' },
  { text: 'Options References', link: '/refs/options' },
  { text: 'Result References', link: '/refs/result' },
]

const INTEGRATIONS: DefaultTheme.NavItemWithLink[] = [
  { text: 'Vue Language Support', link: '/packages/vue' },
  { text: 'Svelte Language Support', link: '/packages/svelte' },
  { text: 'ESLint TwoSlash', link: '/packages/eslint' },
  { text: 'CDN Usage', link: '/packages/cdn' },
]

const VERSIONS: DefaultTheme.NavItemWithLink[] = [
  { text: `v${version} (current)`, link: '/' },
  { text: `Release Notes`, link: 'https://github.com/twoslashes/twoslash/releases' },
  { text: `Contributing`, link: 'https://github.com/twoslashes/twoslash/blob/main/CONTRIBUTING.md' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Twoslash',
  description: 'Markup for TypeScript information in docs',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    async shikiSetup(shiki) {
      await shiki.loadTheme(...Object.keys(bundledThemes) as any)
    },
    codeTransformers: [
      transformerTwoslash(),
      transformerTwoslash({
        errorRendering: 'hover',
        twoslasher: createTwoslasherESLint({
          eslintConfig: [
            ...await antfu() as any,
            {
              files: ['**'],
              rules: {
                'style/eol-last': 'off',
              },
            },
          ],
        }) as any,
        explicitTrigger: /\beslint-check\b/,
      }),
      transformerTwoslash({
        langs: ['svelte'],
        twoslasher: createTwoslasherSvelte(),
      }),
      {
        // Render custom themes with codeblocks
        name: 'twoslash:inline-theme',
        preprocess(code, options) {
          const reg = /\btheme:([\w,-]+)\b/
          const match = options.meta?.__raw?.match(reg)
          if (!match?.[1])
            return
          const theme = match[1]
          const themes = theme.split(',').map(i => i.trim())
          if (!themes.length)
            return
          if (themes.length === 1) {
            // @ts-expect-error anyway
            delete options.themes
            // @ts-expect-error anyway
            options.theme = themes[0]
          }
          else if (themes.length === 2) {
            // @ts-expect-error anyway
            delete options.theme
            // @ts-expect-error anyway
            options.themes = {
              light: themes[0],
              dark: themes[1],
            }
          }
          else {
            throw new Error(`Only 1 or 2 themes are supported, got ${themes.length}`)
          }
          return code
        },
      },
      {
        name: 'twoslash:remove-escape',
        postprocess(code) {
          return code.replace(/\[\\!code/g, '[!code')
        },
      },
    ],
  },

  cleanUrls: true,
  vite,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: 'Guide',
        items: [
          {
            items: GUIDES,
          },
        ],
      },
      {
        text: 'Integrations',
        items: INTEGRATIONS,
      },
      {
        text: 'References',
        items: REFERENCES,
      },
      {
        text: `v${version}`,
        items: VERSIONS,
      },
    ],

    sidebar: Object.assign(
      {},
      {
        '/': [
          {
            text: 'Guide',
            items: GUIDES,
          },
          {
            text: 'Integrations',
            items: INTEGRATIONS,
          },
          {
            text: 'References',
            items: REFERENCES,
          },
        ],
      },
    ),

    editLink: {
      pattern: 'https://github.com/twoslashes/twoslash/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/twoslashes/twoslash' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-PRESENT Orta Therox, Anthony Fu.',
    },
  },

  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'author', content: 'Orta Therox, Anthony Fu' }],
    ['meta', { property: 'og:title', content: 'Twoslash' }],
    ['meta', { property: 'og:image', content: 'https://twoslash.netlify.app/og.png' }],
    ['meta', { property: 'og:description', content: 'Markup for generating rich type information in your documentations ahead of time.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://twoslash.netlify.app/og.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],

    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { ref: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap' }],
  ],
})
