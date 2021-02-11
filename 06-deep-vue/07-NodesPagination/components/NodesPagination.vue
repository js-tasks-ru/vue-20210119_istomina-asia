<script>
export default {
  name: 'NodesPagination',
  render(h) {
    let begin = this.perPage * (this.page - 1);
    let end = this.perPage * this.page;
    if (this.$slots.default) {
      return h('div', this.$slots.default.slice(begin, end));
    } else return h('div');
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped></style>
