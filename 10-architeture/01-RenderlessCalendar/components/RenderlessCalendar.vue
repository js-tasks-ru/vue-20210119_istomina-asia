<script>
/**
 * Возвращает следующий день после текущего
 * @param monthString {String} - Месяц год в формате MM.ГГ
 * @return {Date} - первый день указаного месяца
 */
function getDateFromMonthString(monthString) {
  return new Date(monthString);
}
/**
 * Возвращает следующий день после текущего
 * @param date {Date} - текущая дата
 * @return {Date} - следующий день
 */
function setNextDay(date) {
  return new Date(date.setDate(date.getDate() + 1));
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
  let _daysInMonth = new Date(
    new Date(new Date(date).setMonth(month + 1)).setDate(0),
  ).getDate();
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
  return new Date(date).toDateString();
}
export default {
  name: 'RenderlessCalendar',

  data() {
    return {
      date: this.month
        ? getDateFromMonthString(this.month)
        : new Date(new Date().setDate(1)),
    };
  },

  props: {
    month: {
      type: String,
      default: null,
      validator(value) {
        let arr = Array.from({ length: 12 }, (v, k) => k + 1);
        return arr.includes(+value.substr(5, 2)) && !isNaN(+value.substr(0, 4));
      },
    },
  },

  computed: {
    //текущий месяц в строковом формате
    currentMonth() {
      return this.date
        ? this.date.toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
          })
        : '';
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
          date: makeDateString(_current),
        };
        if (_current.getMonth() != _month) day.isActive = false; //если не текущий месяц, ячейки неактивные

        result.push(day); //запись данных ячейки в результат
        _current = setNextDay(_current); //переход на следующую итерацию
      }
      return result;
    },
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

  render() {
    return this.$scopedSlots.default({
      date: this.date,
      currentMonth: this.currentMonth,
      days: this.days,
      rewindMonth: this.rewindMonth,
      forwardMonth: this.forwardMonth,
    });
  },
};
</script>
