<template>
  <div class="meetups-list">
    <ul>
      <li v-for="item in items_">
        <slot :item="item">
          <span>{{ item }}</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
let i = 0;
export default {
  name: 'ListView',

  props: {
    items: Array,
  },

  data() {
    return {
      items_: [],
    };
  },

  watch: {
    items: {
      immediate: true,
      handler(value) {
        this.items_ = [...value];
      },
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
