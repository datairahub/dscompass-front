<template>
  <div class="page page--logout">
    <div class="page__wrap">
      <h1 class="page__title">Loggin out...</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.$store.dispatch('logout')
      .then(() => {
        window.location.href = '/';
      });
  },
};
</script>
