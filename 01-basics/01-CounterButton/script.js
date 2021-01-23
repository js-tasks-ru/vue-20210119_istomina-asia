import Vue from './vue.esm.browser.js';

var app = new Vue({
    el: '#app',
    data: {
      counter: 1
    },
    methods: {
        increment() {
            this.counter++;
        }
    }
  })