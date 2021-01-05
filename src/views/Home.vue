<template>
  <div class="page page--home">

    <HomeThumbnail></HomeThumbnail>
    <HomeClaim></HomeClaim>
    <HomeFeatures></HomeFeatures>
    <HomeAbout></HomeAbout>

  </div>
</template>

<script>
import EventBus from '@/services/eventbus/EventBus';
import HomeThumbnail from '@/components/home/HomeThumbnail.vue';
import HomeClaim from '@/components/home/HomeClaim.vue';
import HomeFeatures from '@/components/home/HomeFeatures.vue';
import HomeAbout from '@/components/home/HomeAbout.vue';

export default {
  name: 'Home',
  components: {
    HomeThumbnail,
    HomeClaim,
    HomeFeatures,
    HomeAbout,
  },
  computed: {
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
  },
  mounted() {
    if (this.$route.query && this.$route.query.user === 'created') {
      EventBus.$emit('Meeseeks', {
        type: 'success',
        message: this.$t('alert.user_activated'),
      });
    }
  },
};
</script>

<style lang="scss">
.page--home {
  background: white;
}
</style>
