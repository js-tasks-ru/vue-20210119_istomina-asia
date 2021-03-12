<template>
  <div>
    <template v-for="item in selectedItems">
      <slot :item="item">
        {{ item }}
      </slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    page: {
      type: Number,
      reqired: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    selectedItems() {
      let begin = this.perPage * (this.page - 1);
      let end = this.perPage * this.page;
      return this.items.slice(begin, end);
    },
  },
};
</script>

<style></style>
