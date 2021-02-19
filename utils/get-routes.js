export default async (defaultLocale, locales) => {
  const { $content } = require('@nuxt/content')
  const files = await $content({ deep: true }).only(['path']).fetch()

  const filesPaths = files.map((file) => {
    return file.path === '/index' ? '/' : file.path
  })

  const routes = []

  // Remove locale path for default locale route
  filesPaths.forEach((fp) => {
    locales.forEach((locale) => {
      if (locale === defaultLocale) {
        fp = fp.replace(`/${locale}`, '')
      }
    })
    routes.push(fp)
  })

  // Add other routes for locale except default one
  locales.forEach((locale) => {
    if (locale !== defaultLocale) {
      routes.push(`/${locale}`)
      routes.push(`/${locale}/blog`)
    }
  })

  return routes
}
