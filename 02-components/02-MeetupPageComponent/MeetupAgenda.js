// import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <p class="meetup-agenda__empty" v-if="noAgenda">Программа пока пуста, но когда-нибудь в ней обязательно что-нибудь появится!</p>
      <div class="meetup-agenda__item" v-for="item in agenda">
        <div class="meetup-agenda__item-col">
          <img class="icon" alt="icon" :src="item.icon" v-if="item.icon" />
        </div>
        <div class="meetup-agenda__item-col" v-if="item.period">{{ item.period }}</div>
        <div class="meetup-agenda__item-col">
          <h5 class="meetup-agenda__title" v-if="item.title">{{ item.title }}</h5>
          <p v-if="item.isTalk"><span v-if="item.speaker">{{ item.speaker }}</span><span class="meetup-agenda__dot"></span><span class="meetup-agenda__lang" v-if="item.language">{{ item.language }}</span></p>
          <p v-if="item.description">{{ item.description }}</p>
        </div>
      </div>
    </div>`,

  // components

  props: {
    agenda: {
      type: Array,
      required: true,
    }
  },

  computed: {
    noAgenda() {
      return !this.agenda.length; //проверка есть ли программа
    }
  }
};
