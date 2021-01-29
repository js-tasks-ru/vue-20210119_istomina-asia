export const MeetupCover = {
  template: `<div class="meetup-cover" :style="coverStyle">
  <h1 class="meetup-cover__title">{{ title }}</h1>
</div>`,

  props: {
    coverStyle: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  }
};
