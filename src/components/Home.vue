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
      <div class="column" v-for="item in artists">
        <router-link v-bind:to="{ name: 'Artist', params: { id: item.id }}" >
          <div class="box has-text-centered">
            <!--<img v-bind:src="item.artistLinkUrl" alt="Artiste">-->
            <p>{{ item.artistName }}</p>
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
      <div class="column" v-for="item in albums">
        <router-link v-bind:to="{ name: 'Album', params: { id: item.id }}" >
          <div class="box has-text-centered">
            <img v-bind:src="item.artworkUrl100" alt="Jaquette d'album">
            <p>{{ item.collectionName }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Album from '@/Model/Album';
  import * as Artist from '@/Model/Artist';
  import * as api from '@/api';

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
        },
        albums: Album,
        artists: Artist,
      };
    },
    async created() {
      // TODO: RECUPERER LISTE ARTISTES PAS EN DUR COMME CA
      const tmpArtist = await api.getArtist('116851');
      this.artists = tmpArtist.results;

      // TODO: RECUPERER LISTE D'ALBUM PAS EN DUR COMME CA
      const tmpAlbum = await api.getAlbum('1125488753');
      this.albums = tmpAlbum.results;
    }
  };
</script>

<style>
  #Home {
    padding-top: 40px;
  }

</style>
