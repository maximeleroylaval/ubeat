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
      <div class="column" v-if="artists" v-for="item in artists">
        <router-link v-bind:to="{ name: 'Artist', params: { id: item[0].artistId }}" >
          <div class="box has-text-centered">
            <!--<img v-bind:src="item.artistLinkUrl" alt="Artiste">-->
            <p>{{ item[0].artistName }}</p>
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
      <div class="column" v-if="albums" v-for="item in albums">
        <router-link v-bind:to="{ name: 'Album', params: { id: item.collectionId }}" >
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
        artists: [],
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
        ]
      };
    },
    async created() {
      // TODO: RECUPERER LISTE ARTISTES PAS EN DUR COMME CA
      const tmpArtist = [];
      for (let i = 0; i < this.artist_ids.length; i += 1) {
        tmpArtist.push(api.getArtist(this.artist_ids[i]));
      }
      const final = await Promise.all(tmpArtist);
      for (let i = 0; i < final.length; i += 1) {
        this.artists.push(final[i].results);
      }
      console.log(this.artists);

      // TODO: RECUPERER LISTE D'ALBUM PAS EN DUR COMME CA
      const tmpAlbum = await api.getAlbum('1125488753');
      if (tmpAlbum) {
        this.albums = tmpAlbum.results;
      }
    }
  };
</script>

<style>
  #Home {
    padding-top: 40px;
  }

</style>
