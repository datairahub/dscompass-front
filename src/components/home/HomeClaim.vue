<template>
  <div class="home-claim">
    <div class="home-claim__wrap">
      {{$t('home.claim')}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeClaim',
};
</script>

<style lang="scss">
.home-claim {
  background: #EAEAEA;
  padding: 60px 20px;
  text-align: center;
  font-weight: 100;
  font-size: 20px;
  &__wrap {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
