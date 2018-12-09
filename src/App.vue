<template>
    <div id="app">
        <Navigation v-bind:user="user" v-on:logOut="logout" v-if="user"></Navigation>
        <router-view v-bind:user="user" v-on:logged="setUser" v-on:logOut="logout"></router-view>
        <Footer v-if="user"></Footer>
    </div>
</template>

<script>
  import router from '@/router';
  import * as api from '@/api';
  import * as cookie from '@/cookie';
  import * as player from '@/player';
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
        player.clear();
        this.user = null;
        cookie.deleteTokenCookie();
        this.$forceUpdate();
        router.push({ path: '/login' });
      },
      async setUser() {
        this.user = await api.getTokenInfo();
        if (this.user === false) {
          this.user = null;
          this.$emit('logOut');
        } else {
          this.$forceUpdate();
        }
      }
    },
    async mounted() {
      if (cookie.getToken() !== '') {
        this.user = await api.getTokenInfo();
        if (this.user === false) {
          this.logout();
        }
      }
    },
    data() {
      return {
        user: null
      };
    },
  };
</script>

<style>
</style>
