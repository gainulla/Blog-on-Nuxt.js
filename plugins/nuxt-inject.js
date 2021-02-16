import CyrillicToTranslit from 'cyrillic-to-translit-js'
const glob = require('../utils/global-funcs')

export default (context, inject) => {
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

  inject('appendImgSize', glob.appendImgSize)
}
