<template>
  <div class="roadmap">
    <div class="roadmap__wrap">
      <div
        v-for="(q, i) in form.questions"
        :key="i"
        class="roadmap__item"
        @click="$emit('goToQuestion', i)"
        :class="{
          'roadmap__item--current': i+1 === current,
          'roadmap__item--far': i > current || i < current-2,
          'roadmap__item--first': i === 0,
          'roadmap__item--last': i === form.questions.length-1,
        }">{{i+1}}</div>
      <!-- <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div>
      <div v-for="(q, i) in form.questions" :key="i" class="roadmap__item">{{i+1}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormRoadMap',
  props: {
    form: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    current: {
      type: Number,
      required: true,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.roadmap {
  &__wrap {
    display: flex;
    flex-wrap: wrap;
    max-width: 860px;
    padding: 0 10px 20px;
    margin: 0 auto;
    justify-content: center;
  }
  &__item {
    background: #f5f4f4;
    color: #1f1f1f;
    border: 1px solid #eae4e4;
    width: 16px;
    height: 16px;
    line-height: 16px;
    margin: 4px;
    text-align: center;
    padding: 5px;
    border-radius: 100%;
    font-size: 12px;
    cursor: pointer;
    &--current {
      background: #F8971E;
      color: white;
    }
    &--far {
      display: none;
      &.roadmap__item {
        &--first {
          display: block;
          margin-right: 24px;
        }
        &--last {
          display: block;
          margin-left: 24px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1080px) {
  .roadmap {
    &__item {
      &--far {
        display: block;
        &.roadmap__item {
          &--first {
            margin-right: 4px;
          }
          &--last {
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
