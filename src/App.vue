<template>
    <div id="app">
        <div v-if="user">
            <Navigation v-bind:user="user" v-on:logOut="logout"></Navigation>
            <section class="section" v-if="user">
                <router-view v-bind:user="user"></router-view>
            </section>
        </div>
        <div v-else>
            <Login v-bind:user="user" v-on:logged="setUser"/>
        </div>
        <Footer v-if="user"></Footer>
    </div>
</template>

<script>
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
        this.$forceUpdate();
      },
      async setUser() {
        this.user = await
          api.getTokenInfo();
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
