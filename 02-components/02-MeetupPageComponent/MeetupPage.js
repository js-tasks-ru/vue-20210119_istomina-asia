 import { MeetupView } from './MeetupView.js';
//  import { MEETUP_ID, fetchMeetup } from './data.js';
import * as data from './data.js';



export const MeetupPage = {
  name: 'MeetupPage',

  template: `<meetupView  v-if="meetup" :meetup="meetup"/>`,

  // components

  data: {
    meetup: null,
  },

  async mounted() {
    await this.getData(data.MEETUP_ID);
  },

  methods: {
    async getData(meetupId) {
      this.meetup = await data.fetchMeetup(meetupId); //метод для получения данных 
    }
  },
  components: {
    MeetupView
  }
};
