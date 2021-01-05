<template>
  <div class="falistitem">
    <div class="falistitem__info">
      <h4 class="falistitem__name">{{display_name}}</h4>
      <time class="falistitem__date" :datetime="formanswer.created">
        <span>{{$t('common.started')}}: </span>
        <span>{{date(formanswer.created)}} ({{fromNow(formanswer.created)}})</span>
      </time>
      <time class="falistitem__date" :datetime="formanswer.modified">
        <span>{{$t('common.last_modification')}}: </span>
        <span>{{date(formanswer.modified)}} ({{fromNow(formanswer.modified)}})</span>
      </time>
    </div>
    <div class="falistitem__buttons">
      <button class="btn btn--light" @click="resumeItem()">{{$t('common.continue')}}</button>
      <button class="btn btn--light" @click="printItem()">{{$t('common.print')}}</button>
      <button class="btn btn--light" @click="removeItem()">{{$t('common.remove')}}</button>
    </div>
    <div class="falistitem__progress">
      <div class="falistitem__count">
        {{formanswer.answers_length}} / {{formanswer.form.questions_length}}
      </div>
      <div class="falistitem__progressbar" :style="{width: barWidth(formanswer)}">
        <span>{{formanswer.answers_length}} / {{formanswer.form.questions_length}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import ParserService from '@/services/parser/ParserService';

export default {
  name: 'FormAnswerListItem',
  data() {
    return {
      locale: {},
      isMenuOpen: false,
    };
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    formanswer() {
      return ParserService.getFormAnswerData(this.item);
    },
    locales() {
      return this.$store.getters.locales;
    },
    display_name() {
      return this.formanswer.name || this.formanswer.form.display_name;
    },
  },
  created() {
    this.locale = this.$route.params.locale
      ? this.locales.find((l) => l.code === this.$route.params.locale)
      : this.locales[0];
  },
  methods: {
    date(date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    },
    fromNow(date) {
      return moment(date).fromNow();
    },
    barWidth(formanswer) {
      return `${formanswer.answers_percent}%`;
    },
    removeItem() {
      this.$emit('remove-item', this.item.id);
    },
    resumeItem() {
      const form = ParserService.fillFormFromFormAnswer(this.item);
      form.formanswer = this.item.id;
      this.$store.dispatch('put', {
        model: 'form',
        data: form,
      });
      this.$router.push({
        name: 'quiz-edition',
        params: {
          quizid: form.id,
          locale: this.$i18n.locale,
        },
        query: {
          mode: 'continue',
        },
      });
    },
    printItem() {
      const form = ParserService.fillFormFromFormAnswer(this.item);
      this.$store.dispatch('put', {
        model: 'form',
        data: form,
      });
      this.$router.push({ name: 'print', params: { locale: this.$i18n.locale } });
    },
  },
};
</script>

<style lang="scss">
.falistitem {
  background: white;
  padding: 20px 20px 30px;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(60, 66, 87, 0.1), 0 3px 6px 0 rgba(0, 0, 0, 0.07);
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  transition: transform .35s ease,box-shadow .35s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 16px 0 rgba(60,66,87,.1), 0 3px 6px 0 rgba(0,0,0,.07);
  }

  .btn {
    font-size: 12px;
    padding: 8px 13px;
  }
  &__info {
    margin-bottom: 10px;
  }

  &__date {
    margin-bottom: 2px;
    display: block;
    line-height: 1;
    span {
      color: #888;
      opacity: 0.6;
      display: inline-block;
      font-size: 12px;
      + span {
        margin-left: 10px;
        margin-top: 2px;
        display: block;
      }
    }
  }

  &__name {
    font-size: 16px;
    margin-bottom: 0;
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #f5f4f4;
  }
  &__count {
    font-size: 10px;
    padding: 2px 10px 2px 20px;
    line-height: 1;
    position: relative;
    white-space: pre;
  }
  &__progressbar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, #F8971E 0%, #F47420 100%);
    color: white;
    font-size: 10px;
    line-height: 1;
    overflow: hidden;
    span {
      display: block;
      padding: 2px 10px 2px 20px;
      white-space: pre;
    }
  }

  &__buttons {
    margin-top: 16px;
    opacity: 0;
    transition: opacity 250ms ease 200ms;
  }
  &:hover .falistitem__buttons {
    opacity: 1;
  }
}

@media only screen and (min-width: 740px) {
  .falistitem {
    display: flex;
    flex: 0 0 316px;
    margin: 0 10px 10px 0;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
