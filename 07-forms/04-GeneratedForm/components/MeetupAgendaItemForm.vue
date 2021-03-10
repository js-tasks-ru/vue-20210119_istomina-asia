<template>
  <div class="form-section form-section_inner">
    <button
      type="button"
      class="remove-button"
      @click="$emit('remove', localAgendaItem)"
    >
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <formGroup>
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="localAgendaItem.type"
      />
    </formGroup>

    <div class="form__row">
      <div class="form__col">
        <formGroup label="Начало">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.startsAt"
          />
        </formGroup>
      </div>
      <div class="form__col">
        <formGroup label="Окончание">
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
          />
        </formGroup>
      </div>
    </div>

    <formGroup
      v-for="group of $options.fieldSpecifications[localAgendaItem.type]"
      :key="group.field"
      :label="group.title"
    >
      <component
        :is="group.component"
        v-bind="group.props"
        :[group.model.prop]="localAgendaItem[group.field]"
        @[group.model.event]="localAgendaItem[group.field] = $event"
      >
      </component>
    </formGroup>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
  getMillisecondsFromString,
  DAY_IN_MILLISECONDS,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      duration: 0,
    };
  },

  computed: {
    startTime() {
      return this.localAgendaItem.startsAt;
    },
    endTime() {
      return this.localAgendaItem.endsAt;
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler(value) {
        this.$emit('update:agendaItem', { ...value });
      },
    },
    startTime(value) {
      this.localAgendaItem.endsAt = new Date(
        getMillisecondsFromString(value) + this.duration,
      )
        .toISOString()
        .slice(11, 16);
    },
    endTime: {
      immediate: true,
      handler() {
        let start = getMillisecondsFromString(this.localAgendaItem.startsAt);
        let end = getMillisecondsFromString(this.localAgendaItem.endsAt);
        if (end < start) {
          end += DAY_IN_MILLISECONDS;
        }
        this.duration = end - start;
      },
    },
  },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
};
</script>

<style></style>
