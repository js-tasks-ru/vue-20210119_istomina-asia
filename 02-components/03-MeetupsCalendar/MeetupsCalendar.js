/**
 * Возвращает следующий день после текущего
 * @param date {Date} - текущая дата
 * @return {Date} - следующий день
 */
function setNextDay(date) {
  return new Date(date.setDate(date.getDate() + 1))
}

/**
 * Возвращает первый день для отобра;ения в текущем представлении сетки
 * @param date {Date} - первый день текущего месяца
 * @return {Date} - объект даты
 */
function getFirstInGrid(date) {
  let day = date.getDay() ? date.getDay() - 1 : 6; //день недели, с которого начинается месяц
  return new Date(date.setDate(date.getDate() - day));
}

/**
 * Возвращает сколько всего дней дол;но быть в сетке
 * @param date - первый день текущего месяца
 * @return {Number} - количество ячеек в сетке
 */
function getTotalDays(date) {
  let month = date.getMonth(); //текущий месяц
  let day = date.getDay() ? date.getDay() - 1 : 6; //день недели, с которого начинается месяц
  let _daysInMonth = new Date((new Date((new Date(date)).setMonth(month + 1))).setDate(0)).getDate();
  let _rest = (_daysInMonth + day) % 7 ? 7 - ((_daysInMonth + day) % 7) : 0;
  let total = _daysInMonth + day + _rest;
  return total;
}

/**
 * Возвращает строку даты без часов / минут
 * @param date {Date} - объект даты
 * @return {string} - строка даты
 */
function makeDateString(date) {
  return (new Date(date)).toDateString();
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="rewindMonth"></button>
          <div>{{ month }}</div>
          <button class="rangepicker__selector-control-right" @click="forwardMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
      <div class="rangepicker__cell" :class="{'rangepicker__cell_inactive' : !day.isActive}" v-for="day in days">{{ day.num }}
        <template v-if="day.events">
          <a class="rangepicker__event" v-for="event in day.events">{{ event }}</a>
        </template>
      </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    }
  },

  data() {
    return {
      date: new Date((new Date()).setDate(1)),
    }
  },

  computed: {

    //митапы отсортированные по датам (только названия)
    shedule() {
      let shedule = {};
      this.meetups.forEach(meetup => {
        let _date = makeDateString(meetup.date);
        if (!shedule[_date]) {
          shedule[_date] = [];
        }
        shedule[_date].push(meetup.title)
      });
      return shedule;
    },

    //текущий месяц в строковом формате
    month() {
      return this.date? this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      }) : "";
    },

    //данные для ячеек сетки
    days() {

      let result = [];

      let _current = new Date(this.date); //первый день текущего месяца
      let _month = _current.getMonth(); //текущий месяц

      _current = getFirstInGrid(_current); //понедельник первой недели месяца

      let cells = getTotalDays(_current); //сколько всего ячеек в сетке текущего месяца

      for (let cell = 1; cell <= cells; cell++) {
        let day = {
          num: _current.getDate(),
          isActive: true,
        }
        if (_current.getMonth() != _month) day.isActive = false; //если не текущий месяц, ячейки неактивные

        let _date = makeDateString(_current); //проверка, есть ли мероприятия
        if (this.shedule[_date]) day['events'] = this.shedule[_date];

        result.push(day); //запись данных ячейки в результат
        _current =  setNextDay(_current); //переход на следующую итерацию
      }
      return result;
    }
  },

  methods: {

    rewindMonth() {
      let _date = new Date(this.date);
      let _currentMonth = _date.getMonth();
      this.date = new Date(_date.setMonth(_currentMonth - 1));
    },

    forwardMonth() {
      let _date = new Date(this.date);
      let _currentMonth = _date.getMonth();
      this.date = new Date(_date.setMonth(_currentMonth + 1));
    },
  },

};

