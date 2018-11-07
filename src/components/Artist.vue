

<template>
  <div id="Album" class="container">
    <div class="columns">
      <div class="column is-one-third jaq has-text-centered">
        <img src="" alt="Jaquette d'album">
      </div>
      <div class="column has-vertically-aligned-content left">
        <p class="title is-2">{{ artist.artistName }} - {{ artist.primaryGenreName }}</p>

        <p v-if="nbAlbum > 1" class="subtitle is-4">{{ nbAlbum }} Albums</p>
        <p v-else class="subtitle is-4">{{ nbAlbum }} Album</p>

        <div class="extern-buy">
          <a v-bind:href="artist.artistLinkUrl" target="_blank">
            <img src="@/assets/img/itunes_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="container-list">
      <div class="box-album" v-if="albums" v-for="item in albums">
        <router-link v-bind:to="{ name: 'Album', params: { id: item.collectionId }}" >
          <div class="box has-text-centered">
            <i class="far fa-play-circle fa-4x play"></i>
            <img v-bind:src="item.artworkUrl100" alt="Jaquette d'album">
            <p>{{ item.collectionName }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api';
  import * as Artist from '@/Model/Artist';

  export default {
    name: 'Home',
    props: {
    },
    data() {
      return {
        id: this.$route.params.id,
        artist: Artist,
        albums: null,
        nbAlbum: 0
      };
    },
    async created() {
      const tmpArtist = await api.getArtist(this.id);
      const tmp = await api.getAlbumsFromArtist(this.id);
      this.artist = tmpArtist.results[0];
      this.nbAlbum = tmp.resultCount;
      this.albums = tmp.results;
    }
  };
</script>

<style scoped>
  #Album {
    padding-top: 40px;
  }
  .jaq img {
    border-radius: 50%;
    margin-bottom: 40px;
  }
  .extern-buy img {
    max-width: 60px;
  }
  .container-list {
    max-width: 100%;
  }
  .container-list .box:hover img {
    opacity: 0.7;
  }
  .container-list .box:hover .play{
    display: block;
    z-index: 2;
  }
  .box-album {
    vertical-align: top;
    display: inline-block;
    width: 250px;
    max-width: 100%;
  }
  .container-list .box svg {
    position:absolute;
    top: 0;
    bottom: 15%;
    right: 0;
    left: 0;
    margin: auto;
    color:black;
    display: none;
  }
</style>
