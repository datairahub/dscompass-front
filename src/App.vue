<template>
  <div id="app" class="app">
    <Meeseeks></Meeseeks>
    <Topbar></Topbar>
    <transition name="fade" mode="out-in" @after-leave="$root.$emit('triggerScroll')">
      <router-view/>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Topbar from '@/components/topbar/Topbar.vue';
import Meeseeks from '@/components/meeseeks/Meeseeks.vue';
import Footer from '@/components/footer/Footer.vue';

export default {
  name: 'App',
  components: {
    Topbar,
    Meeseeks,
    Footer,
  },
  watch: {
    isAppIdle(isAppIdle) {
      if (isAppIdle) {
        this.$store.dispatch('logout')
          .then(() => {
            window.location.href = '/';
          });
      }
    },
  },
};
</script>
