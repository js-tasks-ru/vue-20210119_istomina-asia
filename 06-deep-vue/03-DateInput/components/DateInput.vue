<template>
  <AppInput
    :type="type"
    :value="localDate"
    :valueAsDate="localDate"
    @change="$emit('update:valueAsNumber', e($event.target.value))"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

/* function onlyDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let date = date.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (date < 10) {
    date = '0' + date;
  }
  return ``;
} */

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
      validator(value) {
        return ['date', 'time', 'datetime-local'].includes(value);
      },
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
  },
  methods: {
    e(value) {
      alert(value);
      return +new Date(value);
    },
  },

  computed: {
    /*     formattedDate() {
      switch (this.type) {
        case 'date':
          return;
      }
    }, */
    localDate() {
      return (
        this.valueAsDate || new Date(this.valueAsNumber) || new Date(this.value)
      );
    },
    localNumber() {
      return this.valueAsNumber || +this.valueAsDate || +this.value;
    },
  },
};
</script>

<style scoped></style>
