import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

//получение данных из API
const fetchMeetup = (meetupId) =>
  fetch(`${API_URL}/meetups/${meetupId}`).then((res) => res.json());

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

//получение даты вида 8 мая 2020
function getLocaleDate(date) {
  date = new Date(date);
  const MONTHS = ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июня', 'июля', 'авг.', 'сен.', 'нояб.', 'дек.'];
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} г.`
}

//получение даты для атрибута тега time
const getDateOnlyString = (date) => {
  date = new Date(date);
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: null,
  },

  async mounted() {
    await this.getData(MEETUP_ID);
  },

  computed: {

    meetup() {
      return !this.rawMeetup ? {} :
        Object.assign({}, this.rawMeetup, {
          coverStyle: this.rawMeetup.imageId
            ? {
                '--bg-url': `url(${getMeetupCoverLink(this.rawMeetup)})`,
              }
            : {}, 
          localeDate: getLocaleDate(this.rawMeetup.date),
          dateOnlyString: getDateOnlyString(this.rawMeetup.date),
        });
    },

    agenda() {
      return this.meetup.agenda && this.meetup.agenda.map(item => {
          item.icon = `/assets/icons/icon-${agendaItemIcons[item.type]}.svg`;
          item.title = item.title || agendaItemTitles[item.type]; //установка названия по умолчанию если нужно
          item.isTalk = item.type === "talk"; //проверка выступление или нет - указывать ли спикера
          item.period = `${item.startsAt} - ${item.endsAt}`;
          return item;
        })
    },

    noAgenda() {
      return !this.agenda || !this.agenda.length; //проверка есть ли программа
    }
  },

  methods: {
    async getData(meetupId) {
      this.rawMeetup = await fetchMeetup(meetupId); //метод для получения данных 
    }
  },
});
