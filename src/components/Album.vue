<template>
  <div id="Album" class="container">
    <div class="columns is-centered header">
      <div class="column is-one-third jaq">
        <img v-bind:src="album.artworkUrl100" alt="Jaquette d'album">
      </div>
      <div class="column has-vertically-aligned-content left headline">
        <p class="title is-1">{{ album.collectionName }}</p>
        <p class="title is-2">{{ album.artistName }}</p>
        <p class="subtitle is-4">{{ album.primaryGenreName }}</p>
        <p class="subtitle is-6">{{ getReleaseDate() }} - {{ album.trackCount }} tracks - {{ getTotalDuration() }}</p>
        <div class="extern-buy">
          <a href="https://itunes.apple.com/fr/album/la-vraie-vie-deluxe/1301468896" target="_blank">
            <img src="@/assets/img/itunes_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="!loading" >
      <div class="lds-dual-ring"></div>
    </div>
    <div v-if="loading" >
    <div class="columns">
      <div class="column">

        <table id="playlist" class="table is-narrow is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th></th>
            <th>Title</th>
            <th>Duration</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in tracks">
            <td>{{index + 1}}</td>
            <td class="add"><a v-on:click="addNewSong = true" title="Add this song to a playlist"><i class="fas fa-plus"></i></a></td>
            <td class="play"><a title="Play this song"><i class="fas fa-play-circle"></i></a></td>
            <td>{{item.trackName }}</td>
            <td>{{ getDuration(item.trackTimeMillis) }}</td>
            <newSongModal v-if="addNewSong" v-bind:track="item" v-model="addNewSong"></newSongModal>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
    </div>
  </div>
</template>


<script>
  import * as Album from '@/models/Album';
  import * as Track from '@/models/Track';
  import * as api from '@/api';
  import newSongModal from './ModalAddNewSongToPlaylist';

  export default {
    name: 'Album',
    props: {
    },
    components: {
      newSongModal
    },
    methods: {
      msToTime(s) {
        const ms = s % 1000;
        let news = (s - ms) / 1000;
        let secs = news % 60;
        news = (news - secs) / 60;
        let mins = news % 60;
        if (mins < 10) {
          mins = `0${mins}`;
        }
        if (secs < 10) {
          secs = `0${secs}`;
        }

        return `${mins}:${secs}`;
      },
      getReleaseDate() {
        const date = new Date(this.album.releaseDate);
        return date.getFullYear();
      },
      getTotalDuration() {
        let total = 0;
        for (let i = 0; i < this.tracks.length; i += 1) {
          total += this.tracks[i].trackTimeMillis;
        }
        return this.msToTime(total);
      },
      getDuration(s) {
        return this.msToTime(s);
      }
    },
    data() {
      return {
        id: this.$route.params.id,
        album: Album,
        tracks: Track,
        addNewSong: false,
        choosenTrack: null,
        loading: false
      };
    },
    async created() {
      const tmpAlbum = await api.getAlbum(this.id);
      this.album = tmpAlbum.results[0];

      const tmpTracks = await api.getTracksFromAlbum(this.id);
      this.tracks = tmpTracks.results;
      this.loading = true;
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
    width: 300px;
    max-width: 100%;
  }
  .extern-buy img {
    max-width: 60px;
  }
  .headline .title.is-1 {
    margin-bottom: 0;
  }

  .add a {
    color: black;
  }
  #playlist tr td:nth-child(1),
  .play, .add{
    max-width: 16px;
  }

  @media screen and (max-width: 1024px) {
    #playlist tr td:nth-child(1),
    .play, .add{
      max-width: 25px;
    }
  }
</style>
