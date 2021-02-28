<template>
  <div class="meetups-list">
    <template v-for="(item, index) in items">
      <slot :item="item" :index="index" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
