const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const write = require('write')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const _ = require('lodash')

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
      let uploadedImage = false

      if (req.files.images.length) {
        files = req.files.images
      } else {
        files.push(req.files.images)
      }

      _.forEach(_.keysIn(files), key => {
        const image = files[key]

        if (image.name == metadata.image) {
          image.mv(path.normalize(`assets/images/featured/${image.name}`))
          uploadedImage = image.name
        } else {
          image.mv(path.normalize(`assets/images/content/${image.name}`))
        }

        imgData.push({
          name: image.name,
          mimetype: image.mimetype,
          size: image.size
        })
      }) // forEach

      if (req.body.isNewPost == 'false' && uploadedImage) {
        if (req.body.image != uploadedImage && req.body.image != defImage) {
          await fs.unlink(
            path.normalize(`assets/images/featured/${req.body.image}`),
            err => {
              if (err) console.error(err)
            }
          )
        }
      }

      imgData.push({
        isNewPost: req.body.isNewPost,
        image: req.body.image,
        uploadedImage: uploadedImage
      })

    } else {
      imgData.push('No file uploaded')
    }

    let filename = `content/${req.body.language}/blog/${metadata.slug}.md`
      filename = path.normalize(filename)

    write(filename, req.body.mdeValue).then(() => {
      res.send({
        status: true,
        message: 'Check Markdown in folder',
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
