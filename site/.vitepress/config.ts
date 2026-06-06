import { defineConfig } from 'vitepress';
import navData from './nav.json';

export default defineConfig({
  title: 'Microsoft Build 2026',
  description:
    'Microsoft Build 2026 の情報ハブ — アナウンス・セッション・リソースを日本語で集約',
  base: '/msbuild2026/',
  lang: 'ja',
  lastUpdated: true,

  head: [['meta', { name: 'robots', content: 'index, follow' }]],

  themeConfig: {
    nav: navData.nav,
    sidebar: navData.sidebar,

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '検索', buttonAriaLabel: '検索' },
          modal: {
            noResultsText: '見つかりませんでした',
            resetButtonTitle: 'クリア',
            footer: {
              selectText: '選択',
              navigateText: '移動',
              closeText: '閉じる',
            },
          },
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/openjny/msbuild2026' },
    ],

    footer: {
      message: 'コンテンツは CC BY 4.0 / コードは MIT ライセンス',
    },

    outline: {
      label: '目次',
    },
  },
});
