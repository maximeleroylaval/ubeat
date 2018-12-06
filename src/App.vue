<template>
    <div id="app">
        <Navigation v-bind:user="user" v-on:logOut="logout" v-if="user"></Navigation>
        <router-view v-bind:user="user" v-on:logged="setUser"></router-view>
        <Footer v-if="user"></Footer>
    </div>
</template>

<script>
  import router from '@/router';
  import * as api from '@/api';
  import Navigation from '@/components/Navigation';
  import Home from '@/components/Home';
  import Footer from '@/components/Footer';
  import Login from './components/Login';


  export default {
    name: 'app',
    props: {},
    components: {
      Login,
      Navigation,
      Home,
      Footer
    },
    methods: {
      logout() {
        this.user = null;
        api.user.email = null;
        this.$forceUpdate();
        router.push({ path: '/login' });
      },
      async setUser() {
        this.user = await api.getTokenInfo();
        this.$forceUpdate();
      }
    },
    async mounted() {
      if (this.user == null && api.user.email !== undefined) {
        this.user = await api.getTokenInfo();
      }
    },
    data() {
      return {
        user: null
      };
    },
  };

  document.body.classList.add('has-navbar-fixed-top');
</script>

<style>
</style>
