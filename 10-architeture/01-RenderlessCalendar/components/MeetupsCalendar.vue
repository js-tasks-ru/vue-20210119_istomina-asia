<template>
  <calendar-view v-slot="{ date }">
    <template v-if="shedule[date]">
      <calendar-view-event
        v-for="meetup in shedule[date]"
        :key="meetup.id"
        tag="router-link"
        :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
        >{{ meetup.title }}</calendar-view-event
      >
    </template>
  </calendar-view>
</template>

<script>
import CalendarView from './CalendarView';
import CalendarViewEvent from './CalendarViewEvent';

function makeDateString(date) {
  return new Date(date).toDateString();
}

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarViewEvent,
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

<style></style>
