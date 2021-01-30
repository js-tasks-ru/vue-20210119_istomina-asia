import {agendaItemIcons, agendaItemTitles} from './data.js'
export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item" >
  <div class="meetup-agenda__item-col">
    <img class="icon" alt="icon" :src="icon" v-if="icon" />
  </div>
  <div class="meetup-agenda__item-col" v-if="period">{{ period }}</div>
  <div class="meetup-agenda__item-col">
    <h5 class="meetup-agenda__title">{{ title }}</h5>
    <p v-if="isTalk"><span v-if="agendaItem.speaker">{{ agendaItem.speaker }}</span><span class="meetup-agenda__dot"></span><span class="meetup-agenda__lang" v-if="agendaItem.language">{{ agendaItem.language }}</span></p>
    <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
  </div>
</div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },
  computed: {
      icon() {
        return  `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
      },

      //установка названия по умолчанию если нужно
      title() {
        return this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
      },

      //проверка выступление или нет - указывать ли спикера
      isTalk() {
        return this.agendaItem.type === "talk";
      },
      period() {
        return `${this.agendaItem.startsAt} - ${this.agendaItem.endsAt}`;
      }
    },
};

