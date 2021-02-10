<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :class="{ button_block: block }"
    v-on="listeners"
    :to="to"
    ><slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',

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
    to: {
      type: String,
    },
  },

  computed: {
    href() {
      return this.$attrs.href;
    },
    listeners() {
      return {
        ...this.$listeners,
        click: ($event) => this.$emit('click', $event.target.value),
      };
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
