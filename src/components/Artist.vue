<template>
    <div id="Album" class="container">
      <div class="center" v-if="!albums">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
      <div v-if="albums">
      <div class="columns">
        <div class="column is-one-third jaq has-text-centered">
          <img v-bind:src="artist.artworkArtistUrl300" alt="Photo de l'artiste">
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
              <img v-bind:src="item.artworkUrl100.replace('100x100bb', '300x0w')" alt="Jaquette d'album">
              <p>{{ item.collectionName }}</p>
            </div>
          </router-link>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
  import * as api from '@/api';
  import * as Artist from '@/models/Artist';

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
    methods: {
      async addArtistPicture(artist) {
        const myartist = JSON.parse(JSON.stringify(artist));
        myartist.artworkArtistUrl300 = await api.scrapArtistPicture(myartist.artistLinkUrl, '300x0w');
        return myartist;
      },
    },
    async created() {
      const tmpArtist = await api.getArtist(this.id);
      const endArtist = await this.addArtistPicture(tmpArtist.results[0]);
      const tmp = await api.getAlbumsFromArtist(this.id);
      this.artist = endArtist;
      this.nbAlbum = tmp.resultCount;
      this.albums = tmp.results;
    }
  };
</script>

<style scoped>
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

  .center {
    position:fixed;
    top: 50%;
    left: 50%;
  }


  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #333;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
  }

</style>
