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
    queryView() {
      return this.$route.query.view;
    },
    queryDate() {
      return this.$route.query.date;
    },
    queryParticipation() {
      return this.$route.query.participation;
    },
    querySearch() {
      return this.$route.query.search;
    },

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
        this.$router.push(this.route);
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
        this.$router.push(this.route);
        return value;
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
        this.$router.push(this.route);
        return value;
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
        this.$router.push(this.route);
      },
    },
  },

  watch: {
    queryView: {
      immediate: true,
      handler(value) {
        if (value === _default.view && this.route.query.view !== undefined) {
          delete this.route.query.view;
          return;
        }
        this.route.query.view = value;
      },
    },
    queryDate: {
      immediate: true,
      handler(value) {
        if (value === _default.date && this.route.query.date !== undefined) {
          delete this.route.query.date;
          return;
        }
        this.route.query.date = value;
      },
    },
    queryParticipation: {
      immediate: true,
      handler(value) {
        if (
          value === _default.participation &&
          this.route.query.participation !== undefined
        ) {
          delete this.route.query.participation;
          return;
        }
        this.route.query.participation = value;
      },
    },
    querySearch: {
      immediate: true,
      handler(value) {
        if (
          value === _default.search &&
          this.route.query.search !== undefined
        ) {
          delete this.route.query.search;
          return;
        }
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
