<template>
  <div>
    <!-- Используем template для повторения слота для всех элементов текущей страницы -->
    <template v-for="item in pageItems">
      <!-- В слот передаём один элемент с текущей страницы -->
      <slot :item="item" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    page: Number,
    perPage: Number,
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    pageItems() {
      // Вычисляемым свойством находим все элементы текущей страницы
      const start = (this.page - 1) * this.perPage;
      const end = this.page * this.perPage;
      return this.items.slice(start, end);
    },
  },
};
</script>

<style></style>
