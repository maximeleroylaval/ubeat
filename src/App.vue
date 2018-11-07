<template>
  <div id="app">
    <Navigation v-bind:user="user"></Navigation>
    <router-view v-bind:user="user"></router-view>
  </div>
</template>

<script>
  import * as api from '@/api';
  import Navigation from '@/components/Navigation';
  import Home from '@/components/Home';

  export default {
    name: 'app',
    props: {
    },
    components: {
      Navigation,
      Home
    },
    async created() {
      this.user = await api.getTokenInfo();
    },
    data() {
      return {
        user: {
          following: [],
          email: String,
          token: String,
          id: String
        }
      };
    },
  };
</script>

<style>
</style>
