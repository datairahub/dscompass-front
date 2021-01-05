<template>
  <div class="footer">
    <div class="footer__wrap">
      <div class="footer__block">
        <ul>
          <li>
            {{$t('footer.pre_tenant')}}
            <a :href="$t('project.tenant_url')">{{$t('project.tenant')}}</a>
          </li>
          <li class="footer__logo">
            <a :href="$t('project.tenant_url')">
              <img src="/brand/madefrom-logo.png" :alt="$t('project.tenant')">
            </a>
          </li>
        </ul>
      </div>
      <div class="footer__block">
        <li>{{$t('footer.responsibilities')}}</li>
      </div>
      <div class="footer__block">
        <ul>
          <li>
            <router-link :to="{name: 'tos', params: { locale: $i18n.locale }}">
              {{$t('footer.tos')}}
            </router-link>
          </li>
          <li>
            <a :href="$t('project.repository_url')">
              {{$t('footer.source_code')}}
            </a>
          </li>
          <li>
            <a href="https://www.protectioninternational.org/en/contact-us-0">
              {{$t('footer.contact')}}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss">
.footer {
  background: #EAEAEA;
  font-weight: 100;
  font-size: 14px;
  text-align: center;

  &__wrap {
    padding: 40px 20px 20px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &__block {
    margin-bottom: 20px;
  }

  ul {}
  li {
    margin-bottom: 6px;
  }
  a {
    color: inherit;
    text-decoration: underline;
    &:hover,
    &:active {
      color: black;
    }
    &:focus {
      color: #f8981d;
    }
  }

  &__logo {
    a {
      display: block;
    }
    img {
      width: 200px;
      height: auto;
      display: block;
      margin: 0 auto;
      max-width: 100%;
    }
  }
}

@media only screen and (min-width: 740px) {
  .footer {
    text-align: left;
    &__wrap {
      flex-direction: row;
    }
    &__block {
      margin-bottom: 20px;
      flex: 0 1 calc(33% - 40px);
      padding: 0 20px;
    }
    ul {}
    li {
      margin-bottom: 6px;
    }
    &__logo {
      img {
        margin: 0;
      }
    }
  }
}

@media print {
  .footer {
    display: none;
  }
}
</style>
