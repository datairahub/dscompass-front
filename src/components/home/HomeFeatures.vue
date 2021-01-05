<template>
  <div class="home-features">
    <div class="home-features__wrap">
      <h2 class="home-features__title">{{$t('home.features_title')}}</h2>

      <div class="home-features__block-wrap">
        <div class="home-features__block">
          {{$t('home.feature_block_1')}}
        </div>
        <div class="home-features__block">
          {{$t('home.feature_block_2')}}
        </div>
      </div>

      <div class="home-features__list-wrap">
        <ul class="home-features__list">
          <li>{{$t('home.feature_1')}}</li>
          <li>{{$t('home.feature_2')}}</li>
        </ul>
        <ul class="home-features__list">
          <li>{{$t('home.feature_3')}}</li>
          <li>{{$t('home.feature_4')}}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFeatures',
};
</script>

<style lang="scss">
.home-features {
  padding: 80px 20px 20px;
  font-weight: 100;

  &__wrap {
    max-width: 900px;
    margin: 0 auto;
  }
  &__title {
    font-weight: 100;
    margin-bottom: 20px;
    font-size: 28px;
    opacity: 0.85;
  }
  &__block {
    margin-bottom: 24px;
  }
  &__list-wrap {
    display: flex;
    flex-direction: column;
  }
  &__list {
    padding-left: 17px;
    li {
      list-style: disc;
      margin-bottom: 6px;
    }
  }
  &__sect-wrap {
    margin-top: 80px;
  }
  &__sect-title {
    text-align: center;
    margin-bottom: 24px;
    h2 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
      opacity: 0.85;
    }
  }
  &__sect-step {
    margin-bottom: 12px;
  }
}

@media only screen and (min-width: 740px) {
  .home-features {
    &__title {
      text-align: center;
    }
    &__block-wrap {
      margin-bottom: 36px;
    }
    &__block {
    }
    &__list-wrap {
      flex-direction: row;
    }
    &__list {
      flex: 0 0 calc(50% - 20px);
    }
    &__sect-steps {
      display: flex;
      flex-wrap: wrap;
    }
    &__sect-step {
      flex: 1 1 calc(33% - 20px);
      padding: 0 10px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
}
</style>
