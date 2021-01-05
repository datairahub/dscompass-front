<template>
  <div class="home-forms" v-if="forms.length">
    <h2 class="home-forms__title">{{$t('home.action_title')}}</h2>
    <div class="home-forms__forms formslist">
      <FormListItem v-for="(f, i) in forms" :key="i" :item="f"></FormListItem>
    </div>
    <div class="home-forms__more">
      <button class="btn" @click="goToForms()">{{$t('home.see_more_plans')}}</button>
    </div>
  </div>
</template>

<script>
import FormListItem from '@/components/forms/FormListItem.vue';

export default {
  name: 'HomeForms',
  components: {
    FormListItem,
  },
  created() {
    this.$store.dispatch('list', {
      model: 'forms',
      updateModel: true,
      params: {
        language: this.$i18n.locale,
      },
    });
  },
  computed: {
    forms() {
      return this.$store.getters.forms;
    },
  },
  methods: {
    goToForms() {
      this.$router.push({ name: 'quizs', params: { locale: this.$i18n.locale } });
    },
  },
};
</script>

<style lang="scss">
.home-forms {
  padding: 80px 0 40px;
  max-width: 1100px;
  margin: 0 auto;
  &__title {
    text-align: center;
    font-weight: 100;
    margin-bottom: 20px;
    font-size: 28px;
    opacity: 0.85;
  }
  &__more {
    text-align: center;
    margin: 60px 0 0;
  }
}

@media only screen and (min-width: 740px) {
  .home-forms {
    .formslist {
      justify-content: center;
    }
  }
}
</style>
