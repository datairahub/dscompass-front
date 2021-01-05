<template>
  <div class="formlistitem">
    <div class="formlistitem__info">
      <h4 class="formlistitem__name" @click="startQuiz(item)">{{item.display_name}}</h4>
      <p class="formlistitem__intro">{{item.introduction}}</p>
    </div>
    <div class="formlistitem__buttons">
      <button class="btn btn--light" @click="startQuiz(item)">{{$t('common.start')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormListItem',
  data() {
    return {
      locale: {},
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.locale = this.$route.params.locale
      ? this.locales.find((l) => l.code === this.$route.params.locale)
      : this.locales[0];
  },
  computed: {
    locales() {
      return this.$store.getters.locales;
    },
  },
  methods: {
    barWidth(item) {
      const value = (item.answers_length / item.form.questions_length) * 100;
      return `${value}%`;
    },
    startQuiz(item) {
      this.$router.push({
        name: 'quiz-edition',
        params: {
          quizid: item.id,
          locale: this.$i18n.locale,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.formlistitem {
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;

  .btn {
    font-size: 12px;
    padding: 8px 13px;
  }
  &__info {
    margin-bottom: 10px;
  }

  &__date {
    margin-bottom: 2px;
    span {
      color: #888;
      opacity: 0.6;
      display: inline-block;
      font-size: 12px;
      + span {
        margin-left: 10px;
      }
    }
  }

  &__intro {
    font-size: 12px;
    margin-top: 12px;
    margin-bottom: 0;
    line-height: 1.7;
    opacity: 0.8;
  }

  &__name {
    font-size: 16px;
    margin-bottom: 0;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  &__buttons {
    margin-top: 16px;
  }
}

@media only screen and (min-width: 740px) {
  .formlistitem {
    display: flex;
    flex: 0 0 calc(33% - 10px);
    margin: 0 10px 10px 0;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
