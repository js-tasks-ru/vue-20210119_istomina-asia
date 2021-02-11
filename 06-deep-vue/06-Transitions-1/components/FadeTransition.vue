<template>
<component
    :is="tag"
    v-bind="$attrs"
    :class="{ button_block: block }"
    v-on="$listeners"
    ><slot />
  </component>
</template>

<script>
export default {
  name: 'FadeTransition',
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
