<template>
  <div id="Home" class="container">
    <div class="columns">
      <div class="column is-5-desktop has-text-centered">
        <img src="@/assets/img/BeeMusicLogoAlpha.png">
        <h1 class="subtitle is-3"><strong>B</strong>etter than <strong>E</strong>verything <strong>E</strong>lse</h1>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="title-home title is-3">Artist</p>
        <hr>
      </div>
    </div>
    <div class="columns container-list">
      <div class="column">
        <router-link to="/Artist">
          <div class="box has-text-centered">
            <img src="@/assets/img/bigflo-oli-artist.jpg" alt="Artiste">
            <p>BigFlo et Oli</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="title is-3 title-home">Albums</p>
        <hr>
      </div>
    </div>
    <div class="columns container-list">
      <div class="column">
        <router-link to="/Album">
          <div class="box has-text-centered">
            <img src="@/assets/img/album.jpg" alt="Jaquette d'album">
            <p>La vraie vie</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      handler: Object,
      access_token: String,
    },
    methods: {

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
    mounted() {
    }
  };
</script>

<style>
  #Home {
    padding-top: 40px;
  }

</style>
