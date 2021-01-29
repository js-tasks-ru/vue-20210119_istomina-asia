 import { MeetupView } from './MeetupView.js';
//  import { MEETUP_ID, fetchMeetup } from './data.js';
import * as data from './data.js';



export const MeetupPage = {
  name: 'MeetupPage',

  template: `<meetupView  v-if="meetup" :meetup="meetup"/>`,

  // components

  data: {
    rawMeetup: null,
  },

  async mounted() {
    await this.getData(data.MEETUP_ID);
  },

  computed: {

    meetup() {
      return !this.rawMeetup ? null :
        Object.assign({}, this.rawMeetup, {
          localeDate: data.getLocaleDate(this.rawMeetup.date),
          dateOnlyString: data.getDateOnlyString(this.rawMeetup.date),
        });
    },
  },
  methods: {
    async getData(meetupId) {
      this.rawMeetup = await data.fetchMeetup(meetupId); //метод для получения данных 
    }
  },
  components: {
    MeetupView
  }
};
