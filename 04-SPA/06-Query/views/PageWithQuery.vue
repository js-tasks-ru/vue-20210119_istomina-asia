<template>
  <div class="container">
    <meetups-view
      :date.sync="date"
      :participation.sync="participation"
      :view.sync="view"
      :search.sync="search"
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
          if (this.route.query.view !== undefined)
            this.$delete(this.route.query, 'view');
        } else {
          let query = Object.assign({}, this.route.query, { view: value });
          this.route = Object.assign({}, { query });
        }
        this.$router.push(this.route).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      },
    },
    date: {
      get() {
        return this.$route.query.date || _default.date;
      },
      set(value) {
        if (value === _default.date) {
          if (this.route.query.date !== undefined)
            this.$delete(this.route.query, 'date');
        } else {
          let query = Object.assign({}, this.route.query, { date: value });
          this.route = Object.assign({}, { query });
        }
        this.$router.push(this.route).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
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
            this.$delete(this.route.query, 'participation');
        } else {
          let query = Object.assign({}, this.route.query, {
            participation: value,
          });
          this.route = Object.assign({}, { query });
        }
        this.$router.push(this.route).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
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
            this.$delete(this.route.query, 'search');
          }
        } else {
          let query = Object.assign({}, this.route.query, { search: value });
          this.route = Object.assign({}, { query });
        }
        this.$router.push(this.route).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      },
    },
  },

  watch: {
    '$route.query.view': {
      immediate: true,
      handler(value) {
        let query = Object.assign({}, this.route.query, { view: value });
        this.route = Object.assign({}, { query });
      },
    },
    '$route.query.date': {
      immediate: true,
      handler(value) {
        let query = Object.assign({}, this.route.query, { date: value });
        this.route = Object.assign({}, { query });
      },
    },
    '$route.query.participation': {
      immediate: true,
      handler(value) {
        let query = Object.assign({}, this.route.query, {
          participation: value,
        });
        this.route = Object.assign({}, { query });
      },
    },
    '$route.query.search': {
      immediate: true,
      handler(value) {
        let query = Object.assign({}, this.route.query, { search: value });
        this.route = Object.assign({}, { query });
      },
    },
  },
};
</script>

<style scoped></style>
