<template>
  <div class="container">
    <meetups-view
      :date.sync="route.query.date"
      :participation.sync="route.query.participation"
      :view.sync="route.query.view"
      :search.sync="route.query.search"
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
        query: { ..._default },
      },
    };
  },

  /*  computed: {
    route: {
      get() {
        return this.$route;
      },
      set() {
        this.route = Object.assign({}, this.$route);
      },
    }, */
  /*  view: {
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
    }, */

  watch: {
    $route: {
      deep: true,
      handler(value) {
        console.log('lkklklk');
        this.route = Object.assign({}, value);
        if (this.route.view === 'list') {
          this.$delete(this.route.query, 'view');
        }
        if (this.route.participation === 'all') {
          this.$delete(this.route.query, 'participation');
        }
        if (this.route.date === 'all') {
          this.$delete(this.route.query, 'date');
        }
        if (this.route.search === '') {
          this.$delete(this.route.query, 'search');
        }
      },
    },
    route: {
      deep: true,
      handler(value) {
        //this.$route = Object.assign({}, value);
        this.$router.push(value).catch((err) => {
          if (err.name !== 'NavigationDuplicated') {
            throw err;
          }
        });
      },
    },
  },
};
</script>

<style scoped></style>
