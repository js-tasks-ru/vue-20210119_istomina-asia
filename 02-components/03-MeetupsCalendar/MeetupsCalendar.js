/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */
const _DAY = 3600000 * 24;


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
      <div>{{ date }}</div>
      <div class="rangepicker__date-grid">
      <div class="rangepicker__cell rangepicker__cell_inactive" v-for="day in days">{{ day.num }}</div>
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
      date: null,
    }
  },
  mounted() {
    this.date = new Date((new Date()).setDate(1));
  },


  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    month() {
      return this.date? this.date.toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
      }) : "";
    },
    days() {
     let result = [];
      let _current = new Date(this.date);
      if (!_current) return result;
      let _month = _current.getMonth();
      let _week = _current.getDay() ? _current.getDay() - 1 : 6;
      _current = new Date(_current.setDate(_current.getDate() - _week));
      let _daysInMonth = new Date((new Date((new Date(_current)).setMonth(_month + 1))).setDate(0)).getDate();
      let _rest = (_daysInMonth + _week) % 7 ? 7 - ((_daysInMonth + _week) % 7) : 0;
      let cells = _daysInMonth + _week + _rest;

      for (let cell = 1; cell <= cells; cell++) {
        let day = {
          num: _current.getDate(),
          date: _current,
        }
        _current =  new Date(_current.setDate(_current.getDate() + 1))
        result.push(day);
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

    }
  },
};
/* <div class="rangepicker__cell rangepicker__cell_inactive">28</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">29</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">30</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">31</div>
        <div class="rangepicker__cell">
          1
          <a class="rangepicker__event">Митап</a>
          <a class="rangepicker__event">Митап</a>
        </div>
        <div class="rangepicker__cell">2</div>
        <div class="rangepicker__cell">3</div> */
