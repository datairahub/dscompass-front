<template>
  <div class="page page--quizs">
    <div class="page__wrap">

      <h1 class="page__title page__title--big">{{$t('quizs.title')}}</h1>

      <p>{{$t('quizs.section_1_1')}}</p>
      <p>{{$t('quizs.section_1_2')}}</p>
      <p>{{$t('quizs.section_1_3')}}</p>

      <h3>{{$t('quizs.section_2')}}</h3>
      <p>{{$t('quizs.section_2_1')}}</p>
      <p style="margin-bottom: 6px">{{$t('quizs.section_2_2')}}</p>
      <ul class="seclist">
        <li>
          <span class="secnum">1</span>
          <div class="sectex"><span>{{$t('quizs.section_2_3')}}</span></div>
        </li>
        <li>
          <span class="secnum">2</span>
          <div class="sectex"><span>{{$t('quizs.section_2_4')}}</span></div>
        </li>
        <li>
          <span class="secnum">3</span>
          <div class="sectex"><span>{{$t('quizs.section_2_5')}}</span></div>
        </li>
      </ul>
      <p>{{$t('quizs.section_2_6')}}</p>

      <h3>{{$t('quizs.section_3')}}</h3>
      <p>{{$t('quizs.section_3_1')}}</p>
      <p>{{$t('quizs.section_3_2')}}</p>
      <p>{{$t('quizs.section_3_3')}}</p>
      <p>{{$t('quizs.section_3_4')}}</p>

      <h3>{{$t('quizs.section_4')}}</h3>
      <ul style="margin-bottom: 24px">
        <li><strong>{{$t('quizs.section_4_1')}}</strong><br>{{$t('quizs.section_4_2')}}</li>
        <li><strong>{{$t('quizs.section_4_3')}}</strong><br>{{$t('quizs.section_4_4')}}</li>
        <li><strong>{{$t('quizs.section_4_5')}}</strong><br>{{$t('quizs.section_4_6')}}</li>
        <li><strong>{{$t('quizs.section_4_7')}}</strong><br>{{$t('quizs.section_4_8')}}</li>
      </ul>
      <p>{{$t('quizs.section_4_9')}}</p>

      <h3>{{$t('quizs.section_5')}}</h3>
      <p>{{$t('quizs.section_5_1')}} {{$t('project.tenant_email')}}</p>

      <h2 class="page__title">{{$t('quizs.title_saved')}}</h2>
      <p class="page__subtitle">{{$t('quizs.subtitle_saved')}}</p>
      <div class="formanswerslist">
        <FormAnswerListItem
          v-for="(fa, i) in formanswers"
          :key="i"
          :item="fa"
          @remove-item="removeItem"
        ></FormAnswerListItem>
        <div class="formanswerslist__empty" v-if="formanswers.length === 0">
          {{$t('quizs.empty')}}
        </div>
      </div>

      <h2 class="page__title">{{$t('quizs.title_available')}}</h2>
      <p class="page__subtitle">{{$t('quizs.subtitle_available')}}</p>
      <div class="formslist">
        <FormListItem v-for="(f, i) in forms" :key="i" :item="f"></FormListItem>
      </div>

    </div>
  </div>
</template>
<script>
import FormListItem from '@/components/forms/FormListItem.vue';
import FormAnswerListItem from '@/components/formanswers/FormAnswerListItem.vue';

export default {
  name: 'Quizs',
  components: {
    FormListItem,
    FormAnswerListItem,
  },
  created() {
    this.$store.dispatch('list', {
      model: 'forms',
      updateModel: true,
      params: {
        language: this.$i18n.locale,
      },
    });
    this.$store.dispatch('list', {
      model: 'formanswers',
      updateModel: true,
    });
  },
  computed: {
    forms() {
      return this.$store.getters.forms;
    },
    formanswers() {
      return this.$store.getters.formanswers;
    },
  },
  methods: {
    removeItem(itemID) {
      if (confirm(this.$t('confirm.remove_form_answer'))) { //eslint-disable-line
        this.$store.dispatch('remove', { model: 'formanswers', id: itemID })
          .then(() => {
            this.$store.dispatch('put', {
              model: 'formanswers',
              data: this.formanswers.filter((fa) => fa.id !== itemID),
            });
          });
      }
    },
  },
};
</script>

<style lang="scss">
.page--quizs {
  .page__wrap {
    max-width: 1100px;
  }

  .formanswerslist {
    margin-bottom: 60px;
  }

  .formslist {
    margin-bottom: 60px;
  }
}

.seclist {
  margin-bottom: 24px;
  // display: flex;
  // flex-wrap: wrap;
  li {
    display: block;
    width: 100%;
    max-width: 360px;
    margin: 0 auto 16px;
  }
  .secnum {
    color: #f8981d;
    display: block;
    text-align: center;
    font-weight: 900;
    font-size: 60px;
  }
  .sectex {
    text-align: center;
    display: block;
  }
}

@media only screen and (min-width: 740px) {
  .formanswerslist {
    display: flex;
    flex-wrap: wrap;
  }

  .seclist {
    display: flex;
  }
}

@media only screen and (min-width: 1160px) {
  .seclist {
    li {
      display: flex;
      margin: 0 20px 16px 0;
    }
    .secnum {
      margin-right: 6px;
      font-size: 90px;
      line-height: 1;
    }
    .sectex {
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
