<template>
  <div class="meeseeks">
    <div class="meeseeks__wrap">
      <transition-group name="meeseeks" mode="out-in">
        <div
          class="meeseeks__item"
          :class="'meeseeks__item--'+m.type"
          v-for="m in meeseeks"
          :key="m.start">
          {{m.message}}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import EventBus from '@/services/eventbus/EventBus';

export default {
  name: 'Meeseeks',
  data() {
    return {
      defaulttime: 3000,
      meeseeks: [],
    };
  },
  mounted() {
    EventBus.$on('Meeseeks', this.queue);
  },
  methods: {
    decodeMsg(data) {
      const decoded = { ...data };
      decoded.type = data.type ? data.type : 'default';
      decoded.time = data.time ? data.time : this.defaulttime;
      decoded.start = new Date().getTime();
      decoded.end = new Date().getTime() + decoded.time;
      return decoded;
    },
    queue(data) {
      const decoded = this.decodeMsg(data);
      this.meeseeks.push(decoded);
      setTimeout(() => {
        this.meeseeks = this.meeseeks.filter((j) => j.end !== decoded.end);
      }, decoded.time);
    },
  },
  beforeDestroy() {
    EventBus.$off('Meeseeks');
  },
};

</script>
<style lang="scss">
.meeseeks {
  position: fixed;
  top: 70px;
  z-index: 9999;
  display: block;
  padding: 0 10px;
  pointer-events: none;
  box-sizing: border-box;
  width: 100%;
  left: 0;

  &__wrap {
    max-width: 820px;
    margin: 0 auto;
  }

  &__item {
    padding: 10px;
    margin: 10px 0;
    box-shadow: 0 0px 5px 0 rgba(60, 66, 87, 0.1), 0 3px 6px 0 rgba(0, 0, 0, .07);
    background: white;
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6;
    pointer-events: all;

    &--success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }

    &--info {
      color: #004085;
      background-color: #cce5ff;
      border-color: #b8daff;
    }

    &--error,
    &--danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }

    &--warning {
      color: #856404;
      background-color: #fff3cd;
      border-color: #efe2bb;
    }
  }

  /* Animations */
  &-enter {
    opacity: 0;
    transform: translate(0, 40px);
  }

  &-leave-to {
    opacity: 0;
    transform: translate(0, -100px);
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 200ms ease 100ms, transform 400ms ease-out;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@media screen and (min-width: 768px) {
  .meeseeks {
    max-width: calc(100% - 160px);
    left: 80px;
  }
}

@media screen and (min-width: 1200px) {
  .meeseeks {
    max-width: calc(100% - 260px);
    left: 130px;
  }
}

</style>
