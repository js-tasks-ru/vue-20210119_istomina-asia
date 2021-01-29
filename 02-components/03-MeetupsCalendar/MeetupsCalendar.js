/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="rewindMonth"></button>
          <div>Июнь 2020</div>
          <button class="rangepicker__selector-control-right" @click="forwardMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell rangepicker__cell_inactive">28</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">29</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">30</div>
        <div class="rangepicker__cell rangepicker__cell_inactive">31</div>
        <div class="rangepicker__cell">
          1
          <a class="rangepicker__event">Митап</a>
          <a class="rangepicker__event">Митап</a>
        </div>
        <div class="rangepicker__cell">2</div>
        <div class="rangepicker__cell">3</div>
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
    this.date = new Date();
  },


  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  methods: {
    rewindMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
      alert(this.date.getMonth());
    },
    forwardMonth() {
      this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
      alert(this.date);
    }
  },
};
