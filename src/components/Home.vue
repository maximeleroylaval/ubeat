<template>
  <div id="Home" class="container">
    <!--<div class="columns">
      <div class="column is-5-desktop has-text-centered">
        <img src="@/assets/img/BeeMusicLogoAlpha.png">
        <h1 class="subtitle is-3"><strong>B</strong>etter than <strong>E</strong>verything <strong>E</strong>lse</h1>
      </div>
    </div>-->
      <div class="columns">
        <div class="column">
          <p class="title-home title is-3">Artist</p>
          <hr>
        </div>
      </div>
      <div v-if="!loading_artist" >
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
    <div v-if="loading_artist">
      <div class="container-list">
        <div class="box-artist" v-if="artists" v-for="item in artists">
          <router-link v-bind:to="{ name: 'Artist', params: { id: item[0].artistId }}" >
            <div class="box has-text-centered">
              <!--<img v-bind:src="item.artistLinkUrl" alt="Artiste">-->
              <p>{{ item[0].artistName }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
      <div class="columns">
        <div class="column">
          <p class="title is-3 title-home">Albums</p>
          <hr>
        </div>
      </div>
    <div v-if="!loading_album" >
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-if="loading_album">
      <div class="container-list">
        <div class="box-album" v-if="albums" v-for="item in albums">
          <router-link v-bind:to="{ name: 'Album', params: { id: item[0].collectionId }}" >
            <div class="box has-text-centered">
              <img v-bind:src="item[0].artworkUrl100" alt="Jaquette d'album">
              <p>{{ item[0].collectionName }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          email: null,
          token: null,
          id: null
        },
        albums: null,
        artists: null,
        artist_ids: [
          356545647,
          116851,
          320569549,
          3979359,
          94804,
          1438665009,
          121982,
          2307416,
          4527097,
          282046174,
          78215262,
          458659054,
          13493906,
          13502164
        ],
        album_ids: [
          275271370,
          971262235,
          1137159646,
          1227088902,
          594075096,
          338815097,
          1202882948,
          428160264,
          260701747,
          122009,
          355294528,
          1282183215,
          892604032,
          1286189741,
          1395644010
        ],
        loading_album: false,
        loading_artist: false
      };
    },
    async created() {
      const tmpArtist = [];
      for (let i = 0; i < this.artist_ids.length; i += 1) {
        tmpArtist.push(api.getArtist(this.artist_ids[i]));
      }
      const final = await Promise.all(tmpArtist);
      this.artists = [];
      for (let i = 0; i < final.length; i += 1) {
        this.artists.push(final[i].results);
      }
      this.loading_artist = true;
      const tmpAlbum = [];
      for (let i = 0; i < this.album_ids.length; i += 1) {
        tmpAlbum.push(api.getAlbum(this.album_ids[i]));
      }
      const finalAlbum = await Promise.all(tmpAlbum);
      this.albums = [];
      for (let i = 0; i < finalAlbum.length; i += 1) {
        this.albums.push(finalAlbum[i].results);
      }
      this.loading_album = true;
    }
  };
</script>

<style>
  #Home {
    padding-top: 40px;
  }

  .center {
    position:fixed;
    left: 50%;
  }
  .box-artist {
    vertical-align: top;
    display: inline-block;
    width: 250px;
  }
  .box-album {
    vertical-align: top;
    display: inline-block;
    width: 250px;
    max-width: 100%;
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
