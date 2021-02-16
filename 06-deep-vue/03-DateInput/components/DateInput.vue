<template>
  <AppInput
    v-if="valueAsNumber"
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :value="formattedDate"
    :valueAsNumber.prop="valueAsNumber"
    @change="$emit('update:valueAsNumber', e($event.target.value))"
    @input="$emit('update:valueAsNumber', e($event.target.value))"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
  <AppInput
    v-else-if="valueAsDate"
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :value="formattedDate"
    :valueAsDate.prop="valueAsDate"
    @change="$emit('update:valueAsDate', o($event.target.value))"
    @input="$emit('update:valueAsDate', o($event.target.value))"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
  <AppInput v-else v-bind="$attrs" v-on="$listeners" :type="type" :value="value">
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

function formatToDate(date) {
  let year = date.getUTCFullYear();
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
}

function formatToTime(date) {
  let hours = date.getUTCHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return `${hours}:${minutes}`;
}

function formatToDateTime(date) {
  return `${formatToDate(date)}T${formatToTime(date)}`;
}

export default {
  name: 'DateInput',
  data() {
    return {
      datee: new Date(),
    };
  },


  components: { AppInput },

  model: {
    prop: 'value',
    event: 'input',
  },

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
      let date;
      if (value.match(/^\d\d:\d\d$/)) date = new Date(`1970-01-01 ${value}`);
      else date = new Date(value)
      let h = date.getHours();
      date.setUTCHours(h)
      return +date;
    },
    o(value) {
      let date = new Date(value)
      let h = date.getHours();
      date.setUTCHours(h)
      return date;
    },
  },

  computed: {
    formattedDate() {
      let res;
      let date = this.valueAsNumber
        ? new Date(this.valueAsNumber)
        : this.valueAsDate;
      switch (this.type) {
        case 'date':
          res = formatToDate(date);
          break;
        case 'time':
          res = formatToTime(date);
          break;
        case 'datetime-local':
          res = formatToDateTime(date);
          break;
        // }
      }
      return res;
    },
  },
};
</script>

<style scoped></style>
