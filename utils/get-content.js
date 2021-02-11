export default async ($content, app, params, perPage, error) => {
  const currentPage = parseInt(params.page)
  const allArticles = await $content(`${app.i18n.locale}/blog`)
                      .without('body')
                      .fetch()
  const totalArticles = allArticles.length
  const lastPage = Math.ceil(totalArticles / perPage)
  const lastPageCount = (totalArticles % perPage != 0)
                        ? totalArticles % perPage
                        : perPage
  
  // console.log('CURRENT PAGE', currentPage)
  // console.log('LAST PAGE', lastPage)
  // console.log('LAST PAGE COUNT', lastPageCount)
  // console.log('TOTAL ARTICLES', totalArticles)

  const skipNumber = () => {
    if (currentPage === 1) {
      return 0;
    }
    if (currentPage === lastPage) {
      return totalArticles - lastPageCount
    }
    return (currentPage - 1) * perPage
  }

  const paginatedArticles = await $content(`${app.i18n.locale}/blog`)
    .only(['title', 'description', 'image', 'alt', 'slug', 'published', 'localesData'])
    .sortBy('published', 'desc')
    .limit(perPage)
    .skip(skipNumber())
    .fetch()

  if (currentPage === 0 || !paginatedArticles) {
    return error({ statusCode: 404, message: 'No articles found!' })
  }

  return {
    allArticles,
    paginatedArticles
  }
}
