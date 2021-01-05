<template>
  <div class="home-thumbnail">
    <div class="home-thumbnail__wrap">
      <div class="home-thumbnail__block">
        <img src="/brand/illustration-header.svg" alt="">
      </div>
      <div class="home-thumbnail__block home-thumbnail__block--content">
        <h1 class="home-thumbnail__title">{{$t('home.title')}}</h1>
        <p class="home-thumbnail__subtitle">{{$t('home.subtitle')}}</p>
        <div class="home-thumbnail__buttons">
          <button class="btn" @click="goToLogin()">{{$t('common.login')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeThumbnail',
  methods: {
    goToLogin() {
      this.$router.push({ name: 'login', params: { locale: this.$i18n.locale } });
    },
    goToForms() {
      this.$router.push({ name: 'quizs', params: { locale: this.$i18n.locale } });
    },
  },
};
</script>

<style lang="scss">
.home-thumbnail {
  background: #087be3;
  background-image: radial-gradient(#5ea9ec 1px, #087be3 1px);
  background-size: 20px 20px;
  img {
    width: 80%;
    height: auto;
    display: block;
    margin: 0 auto;
    max-width: 300px;
  }

  &__wrap {
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
    max-width: 980px;
    margin: 0 auto;
  }

  &__block {
    max-width: 360px;
    margin: 0 auto;
  }

  &__title {
    flex: 0 0 auto;
    font-size: 26px;
    line-height: 1.15;
    margin-top: 30px;
    margin-bottom: 22px;
    color: white;
    text-align: center;
    text-shadow: 0 0 3px rgba(0,0,0,0.5);
  }

  &__subtitle {
    flex: 0 0 auto;
    font-size: 14px;
    line-height: 1.5;
    color: white;
    text-align: center;
    font-weight: 400;
    text-shadow: 0 0 4px rgba(0,0,0,0.5);
  }

  &__buttons {
    text-align: center;
    margin-bottom: 20px;
  }
}

@media only screen and (min-width: 1080px) {
  .home-thumbnail {
    padding-bottom: 40px;
    padding-top: 56px;
    &__wrap {
      display: flex;
      padding-left: 0;
      padding-right: 0;
    }
    &__block {
      flex: 1 1 50%;
      max-width: initial;
      &--content {
        order: -1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    &__title {
      font-size: 38px;
      margin-top: 0;
      text-align: left;
    }
    &__subtitle {
      text-align: left;
    }
    &__buttons {
      text-align: left;
      margin-bottom: 0;
    }
  }
}
</style>
