<script>
export default {
  middleware ({ redirect, $urlFor }) {
    return redirect('301', $urlFor('/blog/page/1'))
  }
}
</script>
