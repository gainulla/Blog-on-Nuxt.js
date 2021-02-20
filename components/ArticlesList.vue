<template>
  <div v-if="articles" class="articles">
    <article v-for="(article, i) in articles" :key="i">
      <div class="article-inner">
        <div class="row">
          <div class="column _md-44 _lg-38">
            <nuxt-link :to="article.path" class="image-link">
              <img
                :srcset="`
                ${featImg(article.image)} 1024w,
                ${featImg($appendImgSize(article.image, '_small'))} 600w,
                ${featImg($appendImgSize(article.image, '_thumb'))} 320w`"
              >
            </nuxt-link>
          </div>

          <div class="column _md-56 _lg-62">
            <div class="details">
              <nuxt-link :to="article.path" class="entry-text">
                <h2 class="title">
                  {{ article.title }}
                </h2>
                <p class="description">
                  {{ article.description }}...
                </p>
              </nuxt-link>
              <div class="tags">
                <nuxt-link
                  v-for="(tag, i2) of $tagsArr(article.localesData)"
                  :key="i2"
                  :to="$urlFor(`/blog/tag/${tag}`, $i18n.locale)"
                >
                  {{ $tagsArr(article.localesData).length > (i2 + 1) ? `${tag},` : tag }}
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>

    <Pagination
      v-if="total > perPage"
      :total="total"
      :per-page="perPage"
    />
  </div>

  <div v-else class="articles">
    <h3 class="text-center mt-2">
      No posts yet.
    </h3>
  </div>
</template>

<script>
export default {
  name: 'ArticlesList',

  props: {
    articles: {
      type: Array,
      default: Array
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 2
    }
  }
}
</script>

<style lang="scss" scoped>

/* Customize flexbox grid for image */

@media (min-width: 768px) {
  .row .column {
    &._md-44 {
      flex: 4.4;
    }
    &._md-56 {
      flex: 5.6;
    }
  }
}

@media (min-width: 992px) {
  .row .column {
    &._lg-38 {
      flex: 3.8;
    }
    &._lg-62 {
      flex: 6.2;
    }
  }
}

/* Article Styles */

.articles {
  padding-bottom: 2rem;

  article {
    background-color: white;
    border-radius: .4rem;
    font-size: 1rem;

    .article-inner {
      .image-link {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 240px;
        max-height: 320px;
        overflow: hidden;
        cursor: pointer;

        img {
          display: block;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          height: 100%;
          object-fit: cover;
        }
      }

      .details {
        text-align: left;
        padding-top: 1rem;
        padding-bottom: 2rem;
        color: #444;

        .title {
          font-size: 1.5em;
          margin: 0;
          font-family: var(--tertiary-font);
          cursor: pointer;
        }
        .description {
          font-family: var(--tertiary-font);
          font-weight: 400;
          font-size: 1.1em;
          color: #444 !important;
        }
        .tags {
          border-top: 1px dashed #DDD;
          padding-top: .2rem;
          align-self: flex-end;
          a {
            font-size: 1.2em;
            font-family: var(--secondary-font);
          }
        }
        .entry-text {
          flex-grow: 1;
        }
      }
    }
  }
}

@media (min-width: 576px) {
  .articles {
    article {
      .article-inner {
        background-color: #f6f7f8;
        padding-left: 2rem;
        padding-right: 2rem;
        border: 1px solid #f1f2f3;
      }
    }
    article:first-of-type {
      .article-inner {
        padding-top: 1.5rem;
      }
    }
  }
}

@media (min-width: 768px) {
  .articles {
    article {
      margin-bottom: 2rem;

      .article-inner {
        padding-left: 0;
        padding-right: 0;
        border-radius: .4rem;

        .image-link {
          position: relative;
          img {
            position: absolute;
            top: 0;
            left: 0;
            border-top-left-radius: .4rem;
            border-bottom-left-radius: .4rem;
          }
        }
        .details {
          padding: 1rem 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .tags {
            width: 100%;
            padding-top: .5rem;
          }
        }
      }
    }
    article:first-of-type {
      .article-inner {
        padding-top: 0;
        margin-top: 2rem;
      }
    }
  }
}
</style>
