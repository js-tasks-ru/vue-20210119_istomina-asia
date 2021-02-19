<template>
  <div class="meetups-list">
    <slot :items="items">
      <template v-for="item in items">
        {{ item }}
      </template>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'ListView',

  props: {
    items: Array,
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
