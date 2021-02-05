const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const write = require('write')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const _ = require('lodash')
const jimp = require('jimp')

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

router.post('/write-file', async (req, res) => {
  try {
    let imgData = []
    const metadata = JSON.parse(req.body.metadata)
    const defImage = 'default.jpg'

    if (req.files) {
      let files = []
      let featImgName = false

      if (req.files.images.length) {
        files = req.files.images
      } else {
        files.push(req.files.images)
      }

      _.forEach(_.keysIn(files), async (key) => {
        const image = files[key]
        const featImg = path.normalize(`assets/images/featured/${image.name}`)
        const contImg = path.normalize(`assets/images/content/${image.name}`)

        if (image.name == metadata.image) {
          await image.mv(featImg)
          await multiResizeImage(featImg)
          featImgName = image.name
        } else {
          await image.mv(contImg)

          const image = await jimp.read(contImg)
          await image.resize(400, jimp.AUTO)
          await image.writeAsync(contImg)
        }

        imgData.push({
          name: image.name,
          mimetype: image.mimetype,
          size: image.size
        })
      }) // forEach

      if (req.body.isNewPost == 'false' && featImgName) {
        if (req.body.image != featImgName && req.body.image != defImage) {
          const featDir = 'assets/images/featured'
          const featImgOld = path.normalize(`${featDir}/${req.body.image}`)
          await fs.unlink(featImgOld)
          await fs.unlink(appendImgSize(featImgOld, '_small'))
          await fs.unlink(appendImgSize(featImgOld, '_thumb'))
        }
      }

      imgData.push({
        isNewPost: req.body.isNewPost,
        image: req.body.image,
        featImgName: featImgName
      })

    } else {
      imgData.push('No file uploaded')
    }

    let filename = `content/${req.body.language}/blog/${metadata.slug}.md`
      filename = path.normalize(filename)

    let message = ""

    if (req.body.language == 'en') {
      message = 'Recorded!'
    } else if (req.body.language == 'ru') {
      message = 'Записано!'
    }

    write(filename, req.body.mdeValue).then(() => {
      res.send({
        status: true,
        message: message,
        filename: filename,
        imgData: imgData
      })
    })

  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = {
  path: '/api',
  handler: router
}

const multiResizeImage = async (filename) => {
  try {
    const image = await jimp.read(filename)

    await image.resize(1024, jimp.AUTO)
    await image.writeAsync(filename)
  
    await image.resize(600, jimp.AUTO)
    const small = appendImgSize(filename, '_small')
    await image.writeAsync(small)
  
    await image.resize(320, jimp.AUTO)
    const thumb = appendImgSize(filename, '_thumb')
    await image.writeAsync(thumb)
  
  } catch(err) {
    console.log('Error occured!', err)
  }
}

const appendImgSize = (filename, append="") => {
  return filename.replace(/(\.[\w\d?=_-]+)$/i, `${append}$1`)
}