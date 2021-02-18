import CyrillicToTranslit from 'cyrillic-to-translit-js'
import conf from '../utils/conf'
const glob = require('../utils/global-funcs')

export default (context, inject) => {
  inject('appendImgSize', glob.appendImgSize)

  inject('urlFor', (path, locale = false) => {
    locale = !locale ? context.app.i18n.locale : locale

    const localePath = (locale !== context.app.i18n.defaultLocale)
      ? `/${locale}`
      : ''

    if (locale === 'ru') {
      path = CyrillicToTranslit().transform(path, '-')
    }

    return localePath + (path).replace(/\s+/g, '-')
  })

  inject('compareTags', (tag, routeTag) => {
    return (CyrillicToTranslit().transform(tag, '-') === routeTag.trim())
  })

  inject('fullUrl', (path) => {
    const { app } = context
    return (app.i18n.locale === app.i18n.defaultLocale)
      ? `${process.env.baseUrl}${path}`
      : `${process.env.baseUrl}/${app.i18n.locale}${path}`
  })

  inject('cyrtt', (string) => {
    return CyrillicToTranslit().transform(string, '-')
  })

  inject('tagsArr', (data) => {
    let tagsArr = []

    if (Array.isArray(data)) {
      data.forEach((item) => {
        if (item.locale === context.app.i18n.locale) {
          if (item.tags !== undefined) {
            tagsArr = item.tags.toString().split(',')
            tagsArr = tagsArr.map(tag => tag.trim())
          }
        }
      })
    } else {
      tagsArr = data.toString().split(',')
      tagsArr = tagsArr.map(tag => tag.trim())
    }

    return tagsArr
  })

  /**
   * Nuxt Module `nuxt-seo-meta` options
   */
  inject('seoMeta', (meta) => {
    const { app } = context
    const mainImage = `${process.env.baseUrl}/${conf.mainImage}`

    return [
      {
        hid: 'description',
        name: 'description',
        content: (meta && meta.description) || app.i18n.t('seoMeta.blogDesc')
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: (meta && meta.type) || app.i18n.t('seoMeta.siteType')
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: (meta && meta.url) || process.env.baseUrl
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: (meta && meta.title) || app.i18n.t('seoMeta.blogTitle')
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: (meta && meta.description) || app.i18n.t('seoMeta.blogDesc')
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: (meta && meta.mainImage) || mainImage
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: (meta && meta.url) || process.env.baseUrl
      },
      {
        hid: 'twitter.title',
        name: 'twitter.title',
        content: (meta && meta.title) || app.i18n.t('seoMeta.blogTitle')
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: (meta && meta.description) || app.i18n.t('seoMeta.blogDesc')
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: (meta && meta.mainImage) || mainImage
      },

      { property: 'og:image:width', content: '740' },
      { property: 'og:image:height', content: '300' },
      { name: 'twitter:site', content: app.i18n.t('seoMeta.siteName') },
      { name: 'twitter:card', content: 'summary_large_image' }
    ]
  })
}
