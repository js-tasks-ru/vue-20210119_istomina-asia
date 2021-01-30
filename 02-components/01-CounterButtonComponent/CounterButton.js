export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: `
    <button 
      style="outline:none"
      type="button"
      @click="$emit('increment', _increment())"
    > {{ count }}
    </button>
  `,
  model: {
    prop: 'count',
    event: 'increment'
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    _increment() {
      return this.count + 1;
    }
  },

};
