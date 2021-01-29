import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <MeetupCover :link="coverLink" :title="meetup.title"/>

      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description="meetup.description"/>
            <h3>Программа</h3>
            <MeetupAgenda :agenda="agenda"/>
          </div>

          <div class="meetup__aside">
            <MeetupInfo :organizer="meetup.organizer" :place="meetup.place" :date="date"/>
          </div>
        </div>
      </div>
  </div>`,

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo
  },


  // props
  props: {
    meetup: {
      type: Object,
      required: true,
    },

  },

  computed: {
    date() {
      return new Date(this.meetup.date);
    },
    agenda() {
      return this.meetup.agenda || [];
    },

    coverLink() {
      return this.meetup.imageId? getMeetupCoverLink(this.meetup) : null;
    },

  }
};
