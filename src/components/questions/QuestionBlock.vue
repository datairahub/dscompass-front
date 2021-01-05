<template>
  <div class="questionblock" :class="{'is-active': question.block && isLoaded}">
    <div :style="{background: question.block.color}">
      {{$t('common.question_$number/$total', {
        number: current,
        total: total
      })}}: {{ question.block.display_name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionBlock',
  data() {
    return {
      isLoaded: false,
    };
  },
  props: {
    question: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    current: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  created() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 10);
  },
};
</script>

<style lang="scss">
.questionblock {
  font-weight: 100;
  margin-bottom: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 350ms ease;
  &.is-active {
    opacity: 1;
    pointer-events: all;
  }
  div {
    padding: 2px 8px;
    display: block;
  }
}
</style>
