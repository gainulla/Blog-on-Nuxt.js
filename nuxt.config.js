import settings from './utils/site-settings'
import getSiteMeta from './utils/get-site-meta'

const meta = getSiteMeta()

export default {
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Nuxt Static Blog',

    meta: [
      ...meta,
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: settings.siteDesc || ''
      },
      { property: 'og:site_name', content: settings.siteName || '' },
      {
        hid: 'description',
        name: 'description',
        content: settings.siteDesc || ''
      },
      { property: 'og:image:width', content: '600' },
      { property: 'og:image:height', content: '320' },
      { name: 'twitter:site', content: settings.siteName || '' },
      { name: 'twitter:card', content: 'summary_large_image' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },

      {
        hid: 'canonical',
        rel: 'canonical',
        href: settings.siteUrl
      },

      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { href: 'https://fonts.googleapis.com/css2?family=Marmelad&family=Nunito:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Ubuntu+Mono:wght@400;700&display=swap', rel: 'stylesheet' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/prism',
    '@/plugins/vue-mixins',
    '@/plugins/nuxt-inject',
    { src: '@/plugins/simplemde', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/content',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ru',
            iso: 'ru-RU',
            name: 'Russian'
          },
          {
            code: 'en',
            iso: 'en-US',
            name: 'English'
          }
        ],
        defaultLocale: 'ru',
        noPrefixDefaultLocale: true,
        vueI18n: {
          fallbackLocale: 'ru',
          messages: {
            ru: require('./locales/ru-ru.json'),
            en: require('./locales/en-us.json')
          }
        }
      }
    ]
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' },
  ],

  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
      }
    }
  },

  generate: {
    exclude: [
      /^\/admin/, // path starts with /admin
      /^\/ru\/admin/, // path starts with ru/admin
      /^\/en\/admin/
    ]
  },

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#Fcdf87', height: '3px', duration: 5000, failedColor: '#CCB9B1', throttle: 0 }

}
