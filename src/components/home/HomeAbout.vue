<template>
  <div class="home-about">
    <div class="home-about__wrap">
      <div class="home-about__block home-about__block--ill">
        <a :href="$t('project.tenant_url')">
          <img src="/brand/madefrom-logo2.png" :alt="$t('project.tenant')">
        </a>
      </div>
      <div class="home-about__block home-about__block--text">
        <div>{{$t('home.about_us')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAbout',
};
</script>

<style lang="scss">
.home-about {
  padding: 80px 20px;
  font-weight: 100;
  text-align: center;

  &__wrap {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &__block {
    img {
      max-width: 100%;
      display: block;
    }
    &--text {
      padding: 40px 0;
      max-width: 440px;
      margin: 0 auto;
      img {
        width: 200px;
        display: block;
        margin: 0 auto 12px;
      }
    }
    &--ill {
      img {
        display: block;
        margin: 0 auto 12px;
      }
    }
  }
}

@media only screen and (min-width: 740px) {
  .home-about {
    &__wrap {
      flex-direction: row;
    }
    &__block {
      flex: 1 1 50%;
      text-align: right;
      &--text {
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
          margin: 0 0 12px;
        }
      }
      &--ill {
        img {
          max-width: calc(100% - 20px);
          margin: 10px auto;
        }
      }
    }
  }
}
</style>
