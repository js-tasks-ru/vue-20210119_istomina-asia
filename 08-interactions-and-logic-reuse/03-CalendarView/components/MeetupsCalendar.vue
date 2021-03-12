<template>
  <calendar-view v-slot="{ date }">
    <template v-if="shedule[date]">
      <router-link
        v-for="meetup in shedule[date]"
        :key="meetup.id"
        :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
        class="rangepicker__event"
        >{{ meetup.title }}</router-link
      >
    </template>
  </calendar-view>
</template>

<script>
/**
 * Возвращает строку даты без часов / минут
 * @param date {Date} - объект даты
 * @return {string} - строка даты
 */
function makeDateString(date) {
  return new Date(date).toDateString();
}
import CalendarView from './CalendarView';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarView,
  },

  computed: {
    //митапы отсортированные по датам (только названия)
    shedule() {
      let shedule = {};
      this.meetups.forEach((meetup) => {
        let _date = makeDateString(meetup.date);
        if (!shedule[_date]) {
          shedule[_date] = [];
        }
        shedule[_date].push({ ...meetup });
      });
      return shedule;
    },
  },
};
</script>

<style scoped>
.rangepicker__event {
  --maxLines: 2;
  --lineHeight: 16px;
  --fontSize: 14px;

  display: block;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  font-weight: 600;
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  text-decoration: none;
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .rangepicker__event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
  }
}
</style>
