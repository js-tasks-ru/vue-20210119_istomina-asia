<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :value.prop="$attrs.value"
      ref="input"
      :checked.prop="checkedOrNot"
      v-bind="$attrs"
      v-on="listeners"
    />
    <slot />
    <span></span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',

inheritAttrs: false,

  model: {
    prop: 'mod',
    event: 'change',
  },

  props: {
    mod: {},
  },

  mounted() {
    if (this.$attrs.checked === "") {
      this.$emit('change', this.calc())
    }
  },

  computed: {
    checkedOrNot() {
      if (this.$attrs.checked === "") return true;
      if (Array.isArray(this.mod)) {
        return  this.mod.includes(this.$attrs.value)
      } else return this.mod;
    },
    listeners() {
      return {
        ...this.$listeners,
        change: () => this.$emit('change', this.calc()),
      };
    },
  },

  methods: {
    calc() {
      let _checked = this.$refs.input.checked;
      if (Array.isArray(this.mod)) {
        let val = this.$attrs.value;
        if (_checked) return this.mod.concat(val);
        else {
          let arr = this.mod.slice();
          arr.splice(this.mod.indexOf(val), 1);
          return arr;
        }
      }
      return _checked;
    },
  },

};
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('../assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>