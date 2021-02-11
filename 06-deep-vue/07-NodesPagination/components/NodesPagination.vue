<script>
function calc(per, page) {
  return Array.from({ length: per }, (v, k) => k + 1 + per * (page - 1));
}
export default {
  name: 'NodesPagination',
  render(h) {
    return h('div', calc(this.perPage, this.page).map(i => this.$slots.default[i]));
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
    'per-page': {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
