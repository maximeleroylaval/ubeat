<template>
  <div id="Album" class="container">
    <div class="columns is-centered header">
      <div class="column is-one-third jaq">
        <img v-bind:src="album.artworkUrl100" alt="Jaquette d'album">
      </div>
      <div class="column has-vertically-aligned-content left">
        {{ album }}
        <p class="title is-1">{{ album.artistName }}</p>
        <p class="subtitle is-4">{{ album.primaryGenreName }}</p>
        <p class="subtitle is-6">{{ album.releaseDate }} - {{ album.trackCount }} tracks - Duration (TODO)</p>
        <div class="extern-buy">
          <a href="https://itunes.apple.com/fr/album/la-vraie-vie-deluxe/1301468896" target="_blank">
            <img src="@/assets/img/itunes_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">

        <table id="playlist" class="table is-narrow is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Title</th>
            <th>Duration</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tracks">
            <td>{{index + 1}}</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>{{item.trackName }}</td>
            <td>{{item.trackTimeMillis }}</td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>
  </div>
</template>


<script>
  import * as Album from '@/Model/Album';
  import * as Track from '@/Model/Track';
  import * as api from '@/api';

  export default {
    name: 'Album',
    props: {
    },
    data() {
      return {
        id: this.$route.params.id,
        album: Album,
        tracks: Track
      };
    },
    async created() {
      const tmpAlbum = await api.getAlbum(this.id);
      this.album = tmpAlbum.results;

      const tmpTracks = await api.getTracksFromAlbum(this.id);
      this.tracks = tmpTracks.results;
    },
  };
</script>

<style>
  #Album {
    padding-top: 40px;
  }
  .header {
    margin-bottom: 40px;
  }
  .jaq img {
    border-radius: 50%;
  }
  .extern-buy img {
    max-width: 60px;
  }

  #playlist tr td:nth-child(1),
  #playlist tr td:nth-child(2){
    max-width: 16px;
  }

  @media screen and (max-width: 1024px) {
    #playlist tr td:nth-child(1),
    #playlist tr td:nth-child(2){
      max-width: 25px;
    }
  }
</style>
