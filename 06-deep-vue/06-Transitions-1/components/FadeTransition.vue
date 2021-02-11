<template>
  <component v-bind="$attrs" :is="tag" v-on="$listeners">
    <transition name="fade"> <slot /> </transition
  ></component>
</template>

<script>
export default {
  name: 'FadeTransition',
  data() {
    return {
      tag: this.$attrs.tag || 'div',
    };
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
