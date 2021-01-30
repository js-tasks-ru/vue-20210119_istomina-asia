
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

    shedule() {
      let shedule = {};
      this.meetups.forEach(meetup => {
        if (!shedule[(new Date(meetup.date)).toDateString()]) {
          shedule[(new Date(meetup.date)).toDateString()] = [];
        }
        shedule[(new Date(meetup.date)).toDateString()].push(meetup.title)
      });
      console.log('okkk');
      return shedule;
    },

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
          isActive: true,
        }
        if (_current.getMonth() != _month) day.isActive = false;
        if (this.shedule[_current.toDateString()]) day['events'] = this.shedule[_current.toDateString()];
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
    },
  },


};

