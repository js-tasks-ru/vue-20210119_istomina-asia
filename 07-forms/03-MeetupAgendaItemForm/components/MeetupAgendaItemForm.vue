<template>
  <div class="form-section form-section_inner">
    <button
      type="button"
      class="remove-button"
      @click="$emit('remove', localAgendaItem)"
    >
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="localAgendaItem.type">
        <option v-for="type of types" :value="type.value" :key="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            ref="start"
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            ref="end"
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{ titleText }}</label>
      <input class="form-control" v-model="localAgendaItem.title" />
    </div>
    <div class="form-group" v-if="renderSpeaker">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="localAgendaItem.speaker" />
    </div>
    <div class="form-group" v-if="renderDescription">
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="localAgendaItem.description"
      ></textarea>
    </div>
    <div class="form-group" v-if="renderLanguage">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="localAgendaItem.language">
        <option
          v-for="language of languages"
          :value="language.value"
          :key="language.value"
        >
          {{ language.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const DAY_IN_MILLISECONDS = 60 * 60 * 24 * 1000;
const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
const MINUTE_IN_MILLISECONDS = 60 * 1000;

function getMillisecondsFromString(string) {
  let hours = parseInt(string.slice(0, 2));
  let minutes = parseInt(string.slice(3));

  return hours * HOUR_IN_MILLISECONDS + minutes * MINUTE_IN_MILLISECONDS;
}

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      types: getAgendaItemTypes(),
      languages: getTalkLanguages(),
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
    titleText() {
      return this.localAgendaItem.type === 'talk'
        ? 'Тема'
        : this.localAgendaItem.type === 'other'
        ? 'Заголовок'
        : 'Нестандартный текст (необязательно)';
    },
    renderSpeaker() {
      return this.localAgendaItem.type === 'talk';
    },
    renderDescription() {
      return (
        this.localAgendaItem.type === 'talk' ||
        this.localAgendaItem.type === 'other'
      );
    },
    renderLanguage() {
      return this.localAgendaItem.type === 'talk';
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler(value) {
        let clone = { ...value };
        this.$emit('update:agendaItem', clone);
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
};
</script>

<style></style>
