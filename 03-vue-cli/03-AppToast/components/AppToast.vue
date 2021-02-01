
<template>
  <div class="toasts">
      <div
        v-for="message in messages"
        class="toast"
        :class="message.toastClass"
        :key="message.text"
      >
        <app-icon :icon="message.toastIcon" />
        <span>{{ message.text }}</span>

      </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

function showToast(_array, _message, _class, _icon, _delay = DELAY) {
  let messageObject = {
        text: _message,
        toastClass: _class,
        toastIcon: _icon,
      };
      _array.push(messageObject);
      setTimeout(() => {
        let index = _array.indexOf(messageObject);
        _array.splice(index, 1);
      }, _delay);
};


export default {
  name: 'AppToast',

  data() {
    return {
      messages: [],
    }
  },

  components: { AppIcon },

  methods: {
    error(message) {
      showToast(this.messages, message, 'toast_error', 'alert-circle');
    },

    success(message) {
      showToast(this.messages, message, 'toast_success', 'check-circle');
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
