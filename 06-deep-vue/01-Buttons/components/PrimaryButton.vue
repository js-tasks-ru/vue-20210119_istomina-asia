<template>
  <BaseButton :tag="tag" :block="block" class="button_primary"
    ><slot
  /></BaseButton>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'PrimaryButton',
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
.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}
</style>
