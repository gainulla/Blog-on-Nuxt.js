const glob = require('../utils/global-funcs')
import CyrillicToTranslit from 'cyrillic-to-translit-js'

export default (context, inject) => {

  inject('tagsArr', data => {
    let tagsArr = []

    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.locale == context.app.i18n.locale) {
          if (item.tags != undefined) {
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
  }),

  inject('compareTags', (tag, routeTag) => {
    return (CyrillicToTranslit().transform(tag, '-') == routeTag.trim())
  }),

  inject('appendImgSize', glob.appendImgSize)

}