export default async ($content, app, params, error) => {
  const currentPage = parseInt(params.page)
  const perPage = 3
  const allArticles = await $content(`${app.i18n.locale}/blog`).fetch()
  const totalArticles = allArticles.length
  const lastPage = Math.ceil(totalArticles / perPage)
  const lastPageCount = totalArticles % perPage
  
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
    .only(['title', 'description', 'image', 'alt', 'slug', 'localesData'])
    .sortBy('createdAt', 'desc')
    .limit(perPage)
    .skip(skipNumber())
    .fetch()

  if (currentPage === 0 || !paginatedArticles.length) {
    return error({ statusCode: 404, message: 'No articles found!' })
  }

  return {
    allArticles,
    paginatedArticles
  }
}
