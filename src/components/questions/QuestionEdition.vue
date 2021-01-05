<template>
  <div class="questionedition">

    <div class="questionedition__title" v-if="question.question">
      <h1>{{ question.question }}</h1>
    </div>

    <div class="questionedition__img" v-if="question.image">
      <img :src="question.image" :alt="question.question">
    </div>

    <div
      class="questionedition__context"
      v-if="question.context"
      v-html="question.context">
    </div>

    <div class="questionedition__example" v-if="question.example">
      <div v-html="question.example"></div>
    </div>

    <div
      class="questionedition__related"
      v-if="question.related_question && getRelatedAnswer(question.related_question)">
      <h4>{{getRelatedQuestion(question.related_question)}}</h4>
      <div>{{getRelatedAnswer(question.related_question)}}</div>
    </div>

    <div class="questionedition__form form" v-if="question.question">
      <textarea
        rows="6"
        v-model="question.response"
        @keyup="$emit('update-answer', question.response)"></textarea>
    </div>

    <div
      class="questionedition__moreinfo"
      v-if="question.more_info"
      v-html="question.more_info">
    </div>

    <div
      class="questionedition__files"
      v-if="question.files">
      <a :href="file.file" v-for="(file, i) in question.files" :key="i" download>
        <button class="btn btn--light btn--file">{{file.name}}</button>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'QuestionEdition',
  props: {
    question: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.question.default_response && !this.question.response) {
      this.question.response = this.question.default_response;
    }
  },
  computed: {
    form() {
      return this.$store.getters.form;
    },
  },
  methods: {
    getRelatedAnswer(questionid) {
      const questions = this.form.questions.filter((q) => q.id === questionid);
      return questions.length && questions[0].response
        ? questions[0].response
        : '';
    },
    getRelatedQuestion(questionid) {
      const questions = this.form.questions.filter((q) => q.id === questionid);
      return questions.length && questions[0].response
        ? questions[0].question
        : '';
    },
  },
};
</script>

<style lang="scss">
.questionedition {
  display: flex;
  flex-wrap: wrap;

  p {
    margin-bottom: 12px;
  }

  &__title {
    flex: 1 1 100%;
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 12px;
    h1 {
      line-height: 1.2;
    }
  }
  &__img {
    flex: 1 1 100%;
    box-sizing: border-box;
    padding: 0 10px;
    margin-bottom: 16px;
    img {
      max-width: 100%;
      margin: 0 auto;
      display: block;
    }
  }
  &__context {
    flex: 1 1 100%;
    box-sizing: border-box;
    font-weight: 100;
    font-size: 16px;
    margin-bottom: 16px;
    margin: 0 10px;
    background: #EAEAEA;
    padding: 10px;
    border-radius: 6px;
  }
  &__example {
    flex: 1 1 100%;
    box-sizing: border-box;
    font-weight: 100;
    font-size: 16px;
    margin: 10px;
    &-title {
      font-weight: 700;
      opacity: 0.8;
      display: block;
      margin-bottom: 4px !important;
    }
  }
  &__related {
    color: #5a5a5a;
    flex: 1 1 100%;
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #EAEAEA;
  }
  &__form {
    flex: 1 1 100%;
    box-sizing: border-box;
    margin: 20px 0;
    padding: 0 10px;
  }
  &__moreinfo {
    flex: 1 1 100%;
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 14px;
    font-weight: 100;
    margin-bottom: 24px;
  }
  &__files {
    flex: 1 1 100%;
    box-sizing: border-box;
    padding: 0 10px;
    > a {
      display: inline-block;
      margin: 0 6px 6px 0;
    }
  }
}

@media only screen and (min-width: 780px) {
  .questionedition {
    &__context {
      flex: 1 1 calc(50% - 20px);
    }
    &__example {
      flex: 1 1 calc(50% - 20px);
      margin-top: 0;
    }
  }
}
</style>
