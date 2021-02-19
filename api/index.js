const path = require('path')
const fs = require('fs')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const write = require('write')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const jimp = require('jimp')
const glob = require('../utils/global-funcs.js')

const app = express()

router.use(fileUpload({ createParentPath: false }))
router.use(cors())

router.use(bodyParser.json())
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/handle-form', async (req, res) => {
  const imgData = []
  const metadata = JSON.parse(req.body.metadata)
  const defImage = 'default.jpg'

  if (req.files) {
    let files = []
    let featImgName = false
    const featDir = 'assets/images/featured'
    const contDir = 'assets/images/content'

    if (req.files.images.length) {
      files = req.files.images
    } else {
      files.push(req.files.images)
    }

    for (const image of files) {
      const featImg = path.normalize(`${featDir}/${image.name}`)
      const contImg = path.normalize(`${contDir}/${image.name}`)

      if (image.name === metadata.image) {
        await image.mv(featImg)
        await multiResizeImage(featImg)
        featImgName = image.name
      } else {
        await image.mv(contImg)
        await multiResizeImage(contImg)
      }

      imgData.push({
        name: image.name,
        mimetype: image.mimetype,
        size: image.size
      })
    } // for

    if (req.body.isNewPost === 'false' && featImgName) {
      if (req.body.image !== featImgName && req.body.image !== defImage) {
        const featImgOld = path.normalize(`${featDir}/${req.body.image}`)
        const small = glob.appendImgSize(featImgOld, '_small')
        const thumb = glob.appendImgSize(featImgOld, '_thumb')
        await fs.unlink(featImgOld, err => imgData.push({ err }))
        await fs.unlink(small, err => imgData.push({ err }))
        await fs.unlink(thumb, err => imgData.push({ err }))
      }
    }
  } // req.files

  let filename = `content/${req.body.language}/blog/${metadata.slug}.md`
  filename = path.normalize(filename)

  write(filename, req.body.mdeValue).then(() => {
    res.send({
      status: true,
      message: 'success',
      filename,
      imgData
    })
  })
}) // router.post

module.exports = {
  path: '/api',
  handler: router
}

const multiResizeImage = async (filename) => {
  const image = await jimp.read(filename)

  await image.resize(1024, jimp.AUTO)
  await image.writeAsync(filename)

  await image.resize(600, jimp.AUTO)
  const small = glob.appendImgSize(filename, '_small')
  await image.writeAsync(small)

  await image.resize(320, jimp.AUTO)
  const thumb = glob.appendImgSize(filename, '_thumb')
  await image.writeAsync(thumb)
}
