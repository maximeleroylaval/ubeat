<template>
  <div id="Album" class="container">
    <div class="has-text-centered" v-if="!loading" >
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-else>
      <div class="columns is-centered header">
        <div class="column is-one-third jaq">
          <img v-bind:src="getAlbumPictureBySize('300x0w')" alt="Jaquette d'album">
        </div>
        <div class="column has-vertically-aligned-content left headline">
          <p class="title is-1">{{ album.collectionName }}</p>
          <p class="title is-2">{{ album.artistName }}</p>
          <p class="subtitle is-4">{{ album.primaryGenreName }}</p>
          <p class="subtitle is-6">{{ getReleaseDate() }} - {{ album.trackCount }} tracks - {{ getTotalDuration() }}</p>
          <div class="extern-buy">
            <a v-bind:href="getAlbumLink()" target="_blank">
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
              <th></th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
            </thead>
            <tbody>
            <song v-for="(item, index) in tracks" :key="item.trackId" v-bind:song="item" v-bind:index="index"/>
            </tbody>
          </table>
          <a class="button" v-on:click="addAllSong = true">Add full album in playlist&nbsp;<i class="fas fa-plus"></i></a>
          <newSongModal v-if="addAllSong" v-bind:track="tracks" v-model="addAllSong" v-on:logOut="logout"></newSongModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as Album from '@/models/Album';
  import * as Track from '@/models/Track';
  import * as api from '@/api';
  import song from '@/components/Song';
  import newSongModal from '@/components/Modal/ModalAddNewSongToPlaylist';

  export default {
    name: 'Album',
    props: {
    },
    components: {
      song,
      newSongModal
    },
    methods: {
      logout() {
        this.$emit('logOut');
      },
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
      getAlbumLink() {
        return this.album.collectionViewUrl;
      },
      getAlbumPictureBySize(size) {
        return this.album.artworkUrl100.replace('100x100bb', size);
      }
    },
    data() {
      return {
        id: this.$route.params.id,
        album: Album,
        tracks: Track,
        addAllSong: false,
        choosenTrack: null,
        loading: false
      };
    },
    async created() {
      const tmpAlbum = await api.getAlbum(this.id);
      if (tmpAlbum === false) {
        this.$emit('logOut');
      } else {
        this.album = tmpAlbum.results[0];

        const tmpTracks = await api.getTracksFromAlbum(this.id);
        if (tmpTracks === false) {
          this.$emit('false');
        } else {
          this.tracks = tmpTracks.results;
          this.loading = true;
        }
      }
    },
  };
</script>

<style scoped>
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
