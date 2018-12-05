<template>
  <div id="app">
    <Navigation v-bind:user="user"></Navigation>
    <section class="section" v-if="user">
      <router-view v-bind:user="user"></router-view>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
  import * as api from '@/api';
  import Navigation from '@/components/Navigation';
  import Home from '@/components/Home';
  import Footer from '@/components/Footer';

  export default {
    name: 'app',
    props: {
    },
    components: {
      Navigation,
      Home,
      Footer
    },
    async created() {
      await api.login();
      this.user = await api.getTokenInfo();
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
