<template>
  <BaseButton :tag="tag" :block="block" class="button_secondary"
    ><slot
  /></BaseButton>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'SecondaryButton',
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
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
