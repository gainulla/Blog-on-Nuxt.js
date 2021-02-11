const path = require('path')

export default {
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'md-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { href: 'https://fonts.googleapis.com/css2?family=Bellota+Text:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Inria+Serif:wght@300;400;700&family=Ubuntu+Mono:ital,wght@1,700&display=swap', rel: 'stylesheet' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/prism',
    '@/plugins/vue-mixins',
    '@/plugins/nuxt-inject'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
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
          },
        ],
        defaultLocale: 'ru',
        noPrefixDefaultLocale: true,
        vueI18n: {
          fallbackLocale: 'ru',
          messages: {
            en: require('./locales/en-us.json'),
            ru: require('./locales/ru-ru.json')
          }
        },
      }
    ]
  ],

  //Build Configuration (https://go.nuxtjs.dev/config-build)
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
  }
}
