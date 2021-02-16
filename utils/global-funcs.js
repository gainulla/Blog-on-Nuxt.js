
const appendImgSize = (filename, append) => {
  return filename.replace(/(\.[\w\d?=_-]+)$/i, `${append}$1`)
}

module.exports.appendImgSize = appendImgSize
