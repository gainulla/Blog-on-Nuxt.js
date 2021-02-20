import getRoutes from './utils/get-routes'
import conf from './utils/conf'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

const siteDefaultLocale = 'ru'

export default {
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Nuxt Blog',

    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },

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
    '@nuxtjs/eslint-module'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend (config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/feed',
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
            iso: 'en-GB',
            name: 'English'
          }
        ],
        defaultLocale: siteDefaultLocale,
        noPrefixDefaultLocale: true,
        vueI18n: {
          fallbackLocale: siteDefaultLocale,
          messages: {
            ru: require('./locales/ru-ru.json'),
            en: require('./locales/en-gb.json')
          }
        }
      }
    ]
  ],

  sitemap: {
    hostname: process.env.BASE_URL || 'http://localhost:3000',
    routes () {
      return getRoutes(siteDefaultLocale, ['ru', 'en'])
    },
    exclude: [
      '/admin/**'
    ]
  },

  feed () {
    const defaultLocale = siteDefaultLocale
    const locales = ['ru', 'en']
    const blogFeedLink = '/blog'
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const { $content } = require('@nuxt/content')

    return locales.map((locale) => {
      return {
        path: `${blogFeedLink}/rss-${locale}.xml`,
        type: 'rss2',
        cacheTime: 1000,
        async create (feed) {
          const localePath = (locale !== defaultLocale)
            ? `${baseUrl}/${locale}`
            : `${baseUrl}`
          const blogLocaleUrl = `${localePath}/blog`

          feed.options = {
            title: conf.siteName[locale] || '',
            description: conf.siteDesc[locale] || '',
            link: blogLocaleUrl
          }

          const articles = await $content(`${locale}/blog`).fetch()

          articles.forEach((article) => {
            let slug = ''
            if (locale === 'ru') {
              slug = CyrillicToTranslit().transform(article.slug)
            } else {
              slug = article.slug
            }
            const url = `${blogLocaleUrl}/${slug}`

            feed.addItem({
              title: article.title,
              id: url,
              link: url,
              date: new Date(article.published),
              description: article.description,
              content: article.description,
              author: conf.twitterHandle
            })
          })
        }
      }
    })
  },

  serverMiddleware: [
    { path: '/api', handler: '~/api/index.js' }
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
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#Fcdf87', height: '3px', duration: 5000, failedColor: '#CCB9B1', throttle: 0 }

}
