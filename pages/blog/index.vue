<script>
export default {
  middleware ({ redirect, app }) {
    const locale = app.i18n.locale !== app.i18n.defaultLocale
      ? `/${app.i18n.locale}/`
      : '/'
    return redirect('301', `${locale}blog/page/1`)
  }
}
</script>
