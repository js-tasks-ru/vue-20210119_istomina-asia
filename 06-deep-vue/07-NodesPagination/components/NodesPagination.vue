<script>
function calc(per, page) {
  return Array.from({ length: per }, (v, k) => k + 1 + per * (page - 1));
}
export default {
  name: 'NodesPagination',
  render: function (createElement) {
    for (let i of calc(this['per-page'], this.page)) {
      return createElement('slot');
    }
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
