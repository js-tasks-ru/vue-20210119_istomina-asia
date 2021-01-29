import {agendaItemIcons, agendaItemTitles} from './data.js'
import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
// import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <MeetupCover :coverStyle="coverStyle" :title="meetup.title"/>

      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description"/>
            <h3>Программа</h3>
            <MeetupAgenda :agenda="agenda" :noAgenda="noAgenda"/>
          </div>

          <div class="meetup__aside">
            <ul class="info-list">
              <li>
                <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
                {{ meetup.organizer }}
              </li>
              <li>
                <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
                {{ meetup.place }}
              </li>
              <li>
                <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
                <time :datetime="meetup.dateOnlyString">{{ meetup.localeDate }}</time>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
  },


  // props
  props: {
    meetup: {
      type: Object,
      required: true,
    },

  },

  computed: {
    agenda() {
      return this.meetup.agenda && this.meetup.agenda.map(item => {
          let newItem = Object.assign({}, item);
          newItem.icon = `/assets/icons/icon-${agendaItemIcons[newItem.type]}.svg`;
          newItem.title = newItem.title || agendaItemTitles[newItem.type]; //установка названия по умолчанию если нужно
          newItem.isTalk = newItem.type === "talk"; //проверка выступление или нет - указывать ли спикера
          newItem.period = `${newItem.startsAt} - ${newItem.endsAt}`;
          return newItem;
        })
    },

    coverStyle() {
      return this.meetup.imageId
            ? {
                '--bg-url': `url(${getMeetupCoverLink(this.meetup)})`,
              }
            : {};
    },

    noAgenda() {
      return !this.agenda || !this.agenda.length; //проверка есть ли программа
    }
  }
};
