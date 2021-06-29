<template>
  <div class="page page--login">
    <div class="page__wrap page__wrap--narrow">

      <div class="login" v-if="!isRegistered">
        <h1 class="login__title">{{$t('login.title')}}</h1>
        <div class="login__wrap">
          <form class="form">

            <div class="form__block form__block--alert" v-if="isWrongLogin">
              {{$t('error.wrongLogin')}}
            </div>

            <div class="form__block">
              <label for="email">{{$t('common.email')}}</label>
              <input
                id="email"
                type="email"
                v-model.trim="email"
                @keyup.enter="submit()">
              <span class="form__error" v-if="email && !isValidEmail">
                {{$t('error.invalidEmail')}}
              </span>
            </div>

            <div class="form__block">
              <label for="password">{{$t('login.password')}}</label>
              <input
                id="password"
                type="password"
                v-model="password"
                @keyup.enter="submit()">
              <span class="form__error" v-if="password && isRegistering && !isValidPassword">
                {{$t('error.invalidPassword')}}
              </span>
            </div>

            <div class="form__block" v-if="isRegistering">
              <label for="password2">{{$t('login.password_repeat')}}</label>
              <input
                id="password2"
                type="password"
                v-model="password2"
                @keyup.enter="submit()">
              <span class="form__error" v-if="password2 && !isValidRepeatedPassword">
                {{$t('error.notEqualRepeatedPassword')}}
              </span>
            </div>

            <div class="form__block" v-if="isRegistering">
              <input type="checkbox" v-model="isAccepted"> {{$t('login.tos_accept')}}
            </div>

            <div class="form__block form__block--buttons" v-show="!isRegistering">
              <button
                type="button"
                class="btn"
                :disabled="!isValidForm || isLoading"
                @click="submit()">{{$t('login.sign_in')}}</button>
            </div>

            <div class="form__block form__block--buttons" v-show="isRegistering">
              <button
                type="button"
                class="btn"
                :disabled="!isValidForm || isLoading"
                @click="submit()">{{$t('login.create_account')}}</button>
            </div>

          </form>
        </div>

        <div class="login__footer login__footer--signin" v-show="!isRegistering">
          <span>{{$t('login.not_registered')}} </span>
          <a @click="isRegistering = true">{{$t('login.not_registered_action')}}</a>.
          <p class="login__recover">
            {{$t('login.recover_password_instructions')}}:<br>{{$t('project.tenant_email')}}
          </p>
        </div>

        <div class="login__footer login__footer--register" v-show="isRegistering">
          <span>{{$t('login.already_registered')}} </span>
          <a @click="isRegistering = false">{{$t('login.already_registered_action')}}</a>.
        </div>

      </div>

      <div class="login login--afterRegister" v-if="isRegistered">
        <h2>{{$t('login.title_after_register')}}</h2>
        <p>{{$t('login.text_after_register')}}</p>
      </div>

    </div>
  </div>
</template>

<script>
import CheckerService from '@/services/checker/CheckerService';

const Check = new CheckerService();

export default {
  name: 'Login',
  data() {
    return {
      isLoading: false,
      isRegistering: false,
      isWrongLogin: false,
      isRegistered: false,
      email: '',
      password: '',
      password2: '',
      isAccepted: false,
    };
  },
  created() {
    if (this.userIsLogged) {
      this.$router.push({ name: 'quizs', params: { locale: this.$i18n.locale } });
    }
  },
  mounted() {
    // Check if user is logged
    this.$store.dispatch('prelogin')
      .then(() => {
        this.$router.push({ name: 'quizs', params: { locale: this.$i18n.locale } });
      });
  },
  computed: {
    isValidEmail() {
      return Check.isValidEmail(this.email);
    },
    isValidPassword() {
      return Check.isValidPassword(this.password);
    },
    isValidRepeatedPassword() {
      return this.password === this.password2;
    },
    isValidForm() {
      return this.isValidEmail
        && this.isValidPassword
        && (!this.isRegistering || (this.password === this.password2 && this.isAccepted));
    },
    userIsLogged() {
      return this.$store.getters.userIsLogged;
    },
  },
  methods: {
    submit() {
      if (this.isRegistering) {
        this.register();
      } else {
        this.login();
      }
    },
    login() {
      this.isLoading = true;
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      }).then((response) => {
        if (response && response.data?.access) {
          this.$router.push({ name: 'quizs', params: { locale: this.$i18n.locale } });
        } else {
          this.wrongLogin();
        }
      }).catch(() => {
        this.wrongLogin();
      }).finally(() => {
        this.isLoading = false;
      });
    },
    register() {
      this.isLoading = true;
      this.$store.dispatch('register', {
        email: this.email,
        password1: this.password,
        password2: this.password2,
      }).then(() => {
        this.isRegistered = true;
      }).catch(() => {
        this.password = '';
        this.password2 = '';
      }).finally(() => {
        this.isLoading = false;
      });
    },
    wrongLogin() {
      this.isWrongLogin = true;
      this.password = '';
      this.password2 = '';
    },
  },
};
</script>

<style lang="scss">
.login {
  margin-top: 20px;

  &__title {
    text-align: center;
    margin-bottom: 20px;
  }

  &__wrap {
    background: white;
    padding: 20px;
    border-radius: 6px;
    box-shadow: 0 7px 14px 0 rgba(60,66,87,.1), 0 3px 6px 0 rgba(0,0,0,.07);
  }

  &__recover {
    margin-top: 20px;
    opacity: 0.6;
    font-size: 14px;
  }

  &__footer {
    padding: 20px;
    text-align: center;
    margin-top: 20px;
  }

  &--afterRegister {
    text-align: center;
  }
}
</style>
