<template>
    <button
        @click="$emit('increment', _increment())"
        > {{ count }}
    </button>
</template>

<script>
export default {
    name: 'CounterButton',

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

    model: {
        prop: 'count',
        event: 'increment'
    }
};
</script>

<style scoped>
    button {
        outline: none;
    }
</style>
