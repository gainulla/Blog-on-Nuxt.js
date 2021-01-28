<template>
  <div class="page">
    <h1 class="text-center mt-0">Edit post</h1>
    
    <p v-if="error" class="error">{{ error }}</p>

    <form class="editForm"
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
      style="font-size:1.1em; line-height:1.7em; font-family:'Bellota Text', sans-serif; font-weight:400 !important;"
    >
      <p class="w-100">
        <label>Images</label>
        <span class="dropper">
          <input
            type="file"
            @change="onFileSelect($event.target.files)"
            multiple
            accept="image/*"
          />
          <span class="icon hashtag" />
          <span class="image">{{ textImages }}</span>
        </span>
      </p>
      <p class="w-100">
        <label>Content</label>
        <textarea ref="contentEditor" class="content-editor" />
      </p>
      <button type="button" @click="onSubmit">Save</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import parseMD from 'parse-md'
import YAML from 'yaml'

export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'
        }
      ],
      script: [
        {
          id: 'script',
          src: 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js',
          async: true,
          defer: true,
          callback: () => this.init()
        }
      ]
    }
  },

  mounted() {
    if (document.getElementById('script')) {
      window.onload = () => this.init()
    }
  },

  data() {
    return {
      simpleMde: null,
      files: null,
      isNewPost: true,
      textImages: "",
      error: ""
    }
  },

  props: {
    data: {
      type: Object,
      default: () => ({
        article: null,
        content: "Article..."
      })
    }
  },

  methods: {

    frontmatter() {
      let metadata;

      if (this.isNewPost) {
        metadata = {
          title: 'Title',
          description: 'Description',
          image: 'default.jpg',
          alt: 'Alt',
          slug: 'post-slug',
          tags: 'tag1, tag2',
          allLanguages: [
            { locale: 'en', slug: 'post-slug' },
            { locale: 'ru', slug: 'слаг-поста' }
          ]
        }
      } else {
        metadata = {
          title: this.data.article.title,
          description: this.data.article.description,
          image: this.data.article.image,
          alt: this.data.article.alt,
          slug: this.data.article.slug,
          tags: this.data.article.tags,
          allLanguages: this.data.article.allLanguages
        }
      }

      return '---\n' + YAML.stringify(metadata) + '---\n'
    },

    init() {
      this.isNewPost = (this.data.article === null)
      this.simpleMde = new SimpleMDE({ element: this.$refs.contentEditor })
      this.simpleMde.value(this.frontmatter() + this.data.content)
    },

    onFileSelect(files) {
      this.files = files
      const imagesArr = Array.from(files).map(image => image.name)
      this.textImages = imagesArr.join(', ')
    },

    onSubmit() {
      let data = {}

      try {
        data = parseMD(this.simpleMde.value())
      } catch(e) {
        this.error = this.$t('postForm.error')
        alert(this.error)
        return;
      }

      this.error = ""

      const formData = new FormData()
      formData.append('isNewPost', this.isNewPost)
      formData.append('metadata', JSON.stringify(data.metadata))
      formData.append('mdeValue', this.simpleMde.value())
      formData.append('language', this.$i18n.locale)

      if (this.files) {
        const files = Array.from(this.files).map(file => {
          formData.append('images', file)
          if (!this.isNewPost) {
            formData.append('image', this.data.article.image)
          }
        })
      }

      this.submit(formData)
    },

    submit(data) {
      // for (let value of data.values()) {
      //   console.log('FORM VALUE', value)
      // }
      axios.post('http://localhost:3000/api/write-file', data)
        .then(res => {
          alert(res.data.message)
        })
    }
 
  } // methods
}
</script>

<style lang="scss" scoped>

.page {
  background-color: white;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

p.error {
  display: inline-block;
  padding: 1.2rem 1.6rem;
  color: #d44343;
  background-color: #EEE;
  border-radius: .4rem;
}

.editForm {
  display: flex;
  flex-flow: row wrap;

  p {
    margin-top: .2rem;
    margin-bottom: .7rem;

    label {
      display: block;
      font-weight: bold;
      letter-spacing: .02em;
      margin-bottom: .2rem;
      &::first-letter {
        text-transform: capitalize;
      }
    }

    &.w-50 {
      width: 50%;
      min-width: 21rem;
    }

    &.w-50:nth-child(2n + 1) {
      width: calc(50% - .7rem);
      margin-right: .7rem;
    }

    &.w-100 {
      width: 100%;
      min-width: 21rem;
    }

    textarea {
      width: 100%;
      padding: 1rem;
      &.content-editor {
        height: 10vh;
      }
    }

    input {
      width: 100%;
      padding: .3rem 0;
      border: 1px solid #DDD;
      border-radius: .2rem;
    }

    .image {
      display: inline-block;
      margin-bottom: .5rem;
    }

    .dropper {
      position: relative;
      width: 100%;
      display: inline-block;
      height: 2.4rem;
      border: 1px solid #DDD;
      border-radius: .2rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      input {
        position: absolute;
        width: 46px;
        height: 2.4rem;
        opacity: 0;
      }

      span {
        margin: 0 .3rem;
      }
    }
  }

  button {
    display: block;
    letter-spacing: .1em;
    padding: .5rem .8rem;
    background-color: hsla(147, 59%, 40%, 0.801);
    border: 0;
    color: white;
    text-transform: uppercase;
    float: right;
    cursor: pointer;
  }
}

</style>