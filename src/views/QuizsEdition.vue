<template>
  <div class="page page--quizedition">

    <QuestionBlock
      v-if="question"
      :current="questionCount + 1"
      :total="questionsNum"
      :question="question"></QuestionBlock>

    <div class="page__wrap">
      <div class="quizedition">

        <transition name="fade" mode="out-in">
          <div class="quizedition__title" v-if="questionCount === -2">
            <h1 class="page__title">{{form.display_name}}</h1>
            <p class="page__intro">{{form.introduction}}</p>
          </div>
          <div class="quizedition__name" v-if="questionCount === -1">
            <label for="fan">{{$t('quizs.formanswer_name_label')}}</label>
            <input id="fan" v-model="name" :placeholder="$t('quizs.formanswer_name_placeholder')">
          </div>
          <QuestionEdition
            v-if="question"
            :question="question"
            :key="question.id"></QuestionEdition>
          <div class="quizedition__conclusion" v-if="questionCount === questionsNum">
            {{form.conclusion}}
          </div>
        </transition>

        <div class="quizedition__buttons">
          <button
            class="btn btn--light"
            v-show="questionCount > -2"
            @click="goToPrevQuestion()">{{$t('common.previous')}}</button>
          <button
            class="btn"
            v-if="questionCount < form.questions.length"
            @click="goToNextQuestion()">
            {{questionCount > -2 ? $t('common.next') : $t('common.start')}}
          </button>
          <button
            class="btn"
            v-if="questionCount === form.questions.length"
            @click="goToQuizPrint()">
            {{$t('common.finish')}}
          </button>
        </div>
      </div>

    </div>

    <FormRoadMap
      v-if="question"
      :form="form"
      @goToQuestion="goToQuestion"
      :current="questionCount + 1"></FormRoadMap>
  </div>
</template>

<script>
import Nanobar from 'nanobar';
import EventBus from '@/services/eventbus/EventBus';
import QuestionBlock from '@/components/questions/QuestionBlock.vue';
import QuestionEdition from '@/components/questions/QuestionEdition.vue';
import FormRoadMap from '@/components/forms/FormRoadMap.vue';
import ParserService from '@/services/parser/ParserService';

export default {
  name: 'QuizsEdition',
  components: {
    QuestionBlock,
    QuestionEdition,
    FormRoadMap,
  },
  data() {
    return {
      name: '',
      questionCount: -2,
      question: null,
      updateInterval: null,
      updateIntervalTime: 1000 * 30,
      nano: new Nanobar(),
    };
  },
  created() {
    this.getStoredForm();
    this.updateInterval = setInterval(() => {
      if (this.questionCount > -1) this.update();
    }, this.updateIntervalTime);
  },
  computed: {
    form() {
      const form = { ...this.$store.getters.form };
      form.questions = form.questions.sort((a, b) => (
        a.block.order === b.block.order
          ? a.order - b.order
          : a.block.order - b.block.order
      ));
      return form;
    },
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
    questionsNum() {
      return this.form && this.form.questions
        ? this.form.questions.length
        : 0;
    },
    formanswers() {
      return this.$store.getters.formanswers;
    },
  },
  methods: {
    getStoredForm() {
      if (this.form.id && this.form.id === this.$route.params.quizid) {
        if (!this.$route.query || this.$route.query.mode !== 'continue') {
          this.getEmptyForm();
        } else if (this.form.formanswer) {
          const efa = this.formanswers.map((f) => f.id);
          const efaidx = efa.indexOf(this.form.formanswer);
          this.name = efaidx > -1 ? this.formanswers[efaidx].name : '';
        }
      } else {
        this.getEmptyForm();
      }
    },
    getEmptyForm() {
      this.$store.dispatch('get', {
        model: 'form',
        id: this.$route.params.quizid,
      }).then((response) => {
        const data = { ...response.data };
        data.questions = data.questions
          .sort((a, b) => (
            a.block.order === b.block.order
              ? a.order - b.order
              : a.block.order - b.block.order
          ));
        this.$store.dispatch('put', { model: 'form', data });
      });
    },
    goToQuestion(questionIndex) {
      this.questionCount = questionIndex;
      window.scrollTo(0, 0);
      this.update();
    },
    goToPrevQuestion() {
      if (this.questionCount > -2) {
        this.questionCount -= 1;
      }
      window.scrollTo(0, 0);
      this.update();
    },
    goToNextQuestion() {
      if (this.questionCount < this.form.questions.length) {
        this.questionCount += 1;
      }
      window.scrollTo(0, 0);
      this.update();
    },
    goToQuizPrint() {
      window.scrollTo(0, 0);
      this.update();
      this.$router.push({ name: 'print', params: { locale: this.$i18n.locale } });
    },
    update() {
      if (!this.userIsLogged || this.questionCount < 0) return;

      if (!this.form.formanswer) {
        this.createFormAnswer();
      } else {
        this.updateFormAnswer();
      }
    },
    updateFormAnswer() {
      this.nano.go(25);
      const answers = ParserService.getAnswersFromForm(this.form);
      this.$store.dispatch('partial_update', {
        model: 'formanswer',
        id: this.form.formanswer,
        data: {
          form: this.form.id,
          name: this.name,
          answers,
        },
      }).then(() => {
        this.nano.go(100);
      }).catch(() => {
        this.reloginUser();
      });
    },
    createFormAnswer() {
      this.nano.go(25);
      const answers = ParserService.getAnswersFromForm(this.form);
      this.$store.dispatch('create', {
        model: 'formanswer',
        data: {
          form: this.form.id,
          name: this.name,
          answers,
        },
      }).then((response) => {
        this.nano.go(100);
        this.$store.dispatch('patch', {
          model: 'form',
          data: {
            formanswer: response.data.id,
          },
        });
      }).catch(() => {
        this.reloginUser();
      });
    },
    reloginUser() {
      EventBus.$emit('Meeseeks', {
        type: 'error',
        time: 6000,
        message: this.$t('alert.authentication_error'),
      });
      setTimeout(() => {
        this.$router.push({ name: 'logout' });
      }, 6000);
    },
  },
  watch: {
    questionCount(val) {
      if (val === -2 || val >= this.form.questions.length) {
        this.question = null;
      } else {
        this.question = this.form.questions[val];
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>

<style lang="scss">
.page--quizedition {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  background: white;

  .page__wrap {
    width: 100%;
    max-width: 860px;
    padding: 60px 0 0;
    margin: 0 auto;
  }
  .page__title {
    margin-top: 0;
  }
}
.quizedition {
  &__title {
    padding: 0 20px;
    max-width: 640px;
    margin: 0 auto;
    text-align: center;
  }
  &__name {
    text-align: center;
    label  {
      display: block;
      margin-bottom: 6px;
    }
    input {
      margin: 0 auto;
      display: block;
      border: 1px solid #d8d8d8;
      padding: 8px 13px;
      border-radius: 3px;
    }
  }
  &__conclusion {
    padding: 0 10px;
    max-width: 640px;
    margin: 0 auto;
    text-align: center;
    white-space: break-spaces;
  }
  &__buttons {
    display: flex;
    margin: 40px 0 40px;
    padding: 0 10px;
    justify-content: center;
    .btn {
      flex: 1 1 100%;
      max-width: 200px;
    }
  }
}
</style>
