<template>
  <div class="container">
    <meetups-view
      :date="date"
      :participation="participation"
      :view="view"
      :search="search"
      @update:date="updateDate"
      @update:participation="updateParticipation"
      @update:view="updateView"
      @update:search="updateSearch"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const _default = {
  view: 'list',
  date: `all`,
  participation: `all`,
  search: ``,
};

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },

  data() {
    return {
      route: {
        query: {},
      },
    };
  },

  computed: {
    view: {
      get() {
        return this.$route.query.view || _default.view;
      },
      set(value) {
        if (value === _default.view) {
          if (this.route.query.view !== undefined) delete this.route.query.view;
        } else {
          this.route.query.view = value;
        }
        this.$router.push(this.route).catch((error) => {
          if (error.name === 'NavigationDuplicated') {
            this.$router.push('');
            this.$router.push(this.route);
            return this.route;
          }
          throw error;
        });
      },
    },
    date: {
      get() {
        return this.$route.query.date || _default.date;
      },
      set(value) {
        if (value === _default.date) {
          if (this.route.query.date !== undefined) delete this.route.query.date;
        } else {
          this.route.query.date = value;
        }
        this.$router.push(this.route).catch((error) => {
          if (error.name === 'NavigationDuplicated') {
            this.$router.push('');
            this.$router.push(this.route);
            return this.route;
          }
          throw error;
        });
      },
    },
    participation: {
      get() {
        return this.$route.query.participation || _default.participation;
      },
      set(value) {
        if (value === _default.participation) {
          if (this.route.query.participation !== undefined)
            delete this.route.query.participation;
        } else {
          this.route.query.participation = value;
        }
        this.$router.push(this.route).catch((error) => {
          if (error.name === 'NavigationDuplicated') {
            this.$router.push('');
            this.$router.push(this.route);
            return this.route;
          }
          throw error;
        });
      },
    },
    search: {
      get() {
        return this.$route.query.search || _default.search;
      },
      set(value) {
        if (value === _default.search) {
          if (this.route.query.search !== undefined) {
            delete this.route.query.search;
          }
        } else {
          this.route.query.search = value;
        }
        this.$router.push(this.route).catch((error) => {
          if (error.name === 'NavigationDuplicated') {
            this.$router.push('');
            this.$router.push(this.route);
            return this.route;
          }
          throw error;
        });
      },
    },
  },

  watch: {
    '$route.query.view': {
      immediate: true,
      handler(value) {
        this.route.query.view = value;
      },
    },
    '$route.query.date': {
      immediate: true,
      handler(value) {
        this.route.query.date = value;
      },
    },
    '$route.query.participation': {
      immediate: true,
      handler(value) {
        this.route.query.participation = value;
      },
    },
    '$route.query.search': {
      immediate: true,
      handler(value) {
        this.route.query.search = value;
      },
    },
  },

  methods: {
    updateDate(date) {
      this.date = date;
    },
    updateParticipation(participation) {
      this.participation = participation;
    },
    updateView(view) {
      this.view = view;
    },
    updateSearch(search) {
      this.search = search;
    },
  },
};
</script>

<style scoped></style>
