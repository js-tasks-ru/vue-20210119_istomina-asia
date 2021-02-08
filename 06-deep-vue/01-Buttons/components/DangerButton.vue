<template>
  <BaseButton :tag="tag" :block="block" class="button_danger"
    ><slot
  /></BaseButton>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'DangerButton',
  components: {
    BaseButton,
  },
  props: {
    block: {
      type: Boolean,
    },
    tag: {
      type: String,
      default: `button`,
      validator(value) {
        return [`button`, `a`, `router-link`].includes(value);
      },
    },
  },
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
