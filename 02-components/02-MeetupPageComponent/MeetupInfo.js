export const MeetupInfo = {
  template: `<ul class="info-list">
  <li>
    <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
    {{ organizer }}
  </li>
  <li>
    <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
    {{ place }}
  </li>
  <li>
    <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
    <time :datetime="dateOnlyString">{{ localeDate }}</time>
  </li>
</ul>`,

  props: {
    date: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    }
  },

  computed: {
    //получение даты для атрибута тега time
    dateOnlyString() {
      const YYYY = this.date.getUTCFullYear();
      const MM = (this.date.getUTCMonth() + 1).toString().padStart(2, '0');
      const DD = this.date.getUTCDate().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}`;
    },

    //получение даты вида 8 мая 2020
    localeDate() {
      return this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }
};
