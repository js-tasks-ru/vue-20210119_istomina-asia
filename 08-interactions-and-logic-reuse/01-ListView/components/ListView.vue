<template>
  <div class="meetups-list">
    <ul>
      <li v-for="item in items_" :key="item.key">
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
        this.items_ = [
          ...this.items_.map(item => {  if (!item.key) item.key = i++; return item}),
          ...value.filter((item) => {
            if (this.items_.includes(item)) return false;
            item.key = i++;
            return true;
          }),
        ];
      },
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
