<template>
  <transition-group
    name="fade-list"
    :tag="$attrs.tag"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'FadeTransitionGroup',
  data() {
    return {
      tag: this.$attrs.tag || 'div',
    };
  },
};
</script>

<style>
.fade-list {
  position: relative;
}

.fade-list > * {
  transition: all 0.3s ease-out;
}

.fade-list-leave-active {
  position: absolute !important;
  left: 0;
  right: 0;
}

.fade-list-enter,
.fade-list-leave-to {
  opacity: 0;
}

.fade-list-move {
  transition: transform 0.3s;
}
</style>
