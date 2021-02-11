<template>
  <button @click="$emit('increment', _increment())">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      count_: this.count,
    };
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    _increment() {
      this.count_ += 1;
      return this.count + 1;
    },
  },
  watch: {
    count(value) {
      this.count_ = value;
    },
  },
};
</script>

<style></style>
