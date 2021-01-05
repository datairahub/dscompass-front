<template>
  <div class="topbar">
    <div class="topbar__wrap">
      <div class="topbar__logo">
        <router-link :to="{name: 'home', params: {locale: $i18n.locale}}">
          <img src="/brand/logo-sm-color.svg" :alt="$t('title')">
          <span>{{$t('project.name')}}</span>
        </router-link>
      </div>
      <div class="topbar__menu-launch">
        <router-link
          v-if="userIsLogged"
          :to="{name:'quizs', params: {locale: $i18n.locale}}">
          {{$t('menu.quizs')}}
          </router-link>
        <router-link
          v-if="!userIsLogged"
          class="login-link"
          :to="{name:'login', params: {locale: $i18n.locale}}">
          {{$t('menu.login')}}
        </router-link>
        <router-link
          v-if="userIsLogged"
          :to="{name:'logout', params: {locale: $i18n.locale}}">
          {{$t('menu.logout')}}
        </router-link>
        <img
          src="/icons/menu.svg"
          alt="Menu"
          @click="isMenuActive = !isMenuActive">
      </div>
    </div>

    <nav class="topbar__menu" :class="{'is-active': isMenuActive}">
      <ul>
        <li v-if="userIsLogged" @click="isMenuActive = false">
          <router-link
            :to="{name:'quizs', params: {locale: $i18n.locale}}">
            {{$t('menu.quizs')}}
          </router-link>
        </li>
        <li v-if="!userIsLogged" @click="isMenuActive = false" class="login">
          <router-link
            :to="{name:'login', params: {locale: $i18n.locale}}">
            {{$t('menu.login')}}
          </router-link>
        </li>
        <li>
          <a href="https://www.protectioninternational.org/en/">
            {{$t('menu.about')}}
          </a>
        </li>
        <li>
          <router-link :to="{name: 'tos', params: { locale: $i18n.locale }}">
            {{$t('footer.tos')}}
          </router-link>
        </li>
        <li>
          <a href="https://www.protectioninternational.org/en/contact-us-0">
            {{$t('menu.contact')}}
          </a>
        </li>
        <li v-if="userIsLogged" @click="isMenuActive = false">
          <router-link
            :to="{name:'logout', params: {locale: $i18n.locale}}">
            {{$t('menu.logout')}}
          </router-link>
        </li>
      </ul>
      <ul>
        <li v-for="(l, i) in locales" :key="i" class="topbar__lang">
          <span @click="changeLanguage(l)">{{l.name}}</span>
        </li>
      </ul>
    </nav>

    <div
      class="topbar__overlay"
      @click="isMenuActive = false"
      :class="{'is-active': isMenuActive}"></div>
  </div>
</template>

<script>
export default {
  name: 'Topbar',
  data() {
    return {
      isMenuActive: false,
    };
  },
  created() {
    this.$store.dispatch('getLocales');
  },
  computed: {
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
    locales() {
      return this.$store.getters.locales;
    },
  },
  methods: {
    changeLanguage(locale) {
      const params = { ...this.$route.params };
      params.locale = locale.code;
      const props = this.$router.resolve({
        name: this.$route.name,
        params,
      });
      window.location.href = props.href;
    },
  },
};
</script>

<style lang="scss">
$background-color: white;
$topbar-height: 62px;
$menu-width: 30%;
$menu-width-min: 240px;

.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: $background-color;
  border-bottom: 1px solid #e0e0e0;

  &__wrap {
    padding: 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  &__logo {
    a {
      display: block;
    }
    img {
      display: inline-block;
      height: 22px;
      width: auto;
      vertical-align: top;
    }
    span {
      line-height: 22px;
      color: black;
      margin-left: 2px;
      vertical-align: top;
      font-weight: 700;
      display: none;
    }
  }

  &__menu-launch {
    display: flex;
    img {
      display: block;
      width: auto;
      height: 22px;
      cursor: pointer;
      transition: opacity 250ms ease;
      margin-left: 14px;
      &:active {
        opacity: 0.4;
      }
    }
    a {
      display: none;
      margin-right: 0;
      line-height: 22px;
      color: #090909;
      font-size: 12px;
      letter-spacing: 0.3px;
      line-height: 0;
      padding: 12px;
      border-radius: 3px;
      &:active,
      &:hover {
        color: #525252;
      }
      &:focus {
        color: #f8981d;
      }
    }
  }

  &__menu {
    position: fixed;
    top: $topbar-height;
    padding: 20px;
    right: -$menu-width-min;
    width: $menu-width-min;
    min-width: $menu-width-min;
    height: calc(100% - #{$topbar-height});
    box-sizing: border-box;
    transition: right 250ms ease;
    background: $background-color;
    &.is-active {
      right: 0;
    }
    a {
      display: block;
      margin-bottom: 20px;
      color: #212121;
    }

    ul +  ul {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(0, 0, 0, 0.17);
    }
  }

  &__overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 250ms ease;
    &.is-active {
      pointer-events: all;
      opacity: 1;
    }
  }
  &__lang {
    display: block;
    margin-bottom: 12px;
    cursor: pointer;
    transition: opacity 250ms ease;
    &:hover {
      opacity: 0.6;
    }
    span {
      text-transform: capitalize;
    }
  }
}

@media only screen and (min-width: 340px) {
  .topbar {
    &__logo {
      span {
        display: inline-block;
      }
    }
  }
}

@media only screen and (min-width: 740px) {
  .topbar {
    &__wrap {
      padding: 10px;
    }
    &__logo {
      padding: 6px;
      img {
        height: 32px;
      }
      span {
        font-size: 20px;
        line-height: 32px;
      }
    }
    &__menu-launch {
      padding: 10px;
      a {
        display: block;
      }
      img {
        // display: none;
      }
      .login-link {
        color: white;
        background: #F8971E;
        &:focus {
          color: black;
        }
      }
    }
    &__menu {
      right: calc(-#{$menu-width} - 10px);
      width: $menu-width;
      .login {
        display: none;
      }
    }
  }
}

@media print {
  .topbar {
    display: none;
  }
}
</style>
