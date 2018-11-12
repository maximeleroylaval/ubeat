<template>
    <tr>
        <td>{{ this.index + 1 }}</td>
        <td v-if="!this.playlist" class="add"><a v-on:click="addToMyPlaylist()" title="Add this song to a playlist"><i class="fas fa-plus"></i></a></td>
        <td class="play"><a v-on:click="playPreview()" title="Play this song"><i v-bind:id="'playBtn' + this.song.trackId" class="fas fa-play-circle"></i></a></td>
        <td>{{ this.song.trackName }}</td>
        <td v-if="!this.playlist">{{ getDuration() }}</td>

        <td v-if="this.playlist">{{ this.song.artistName }}</td>
        <td v-if="this.playlist">{{ this.song.collectionName }}</td>
        <td v-if="this.playlist">
          <a class="button" v-on:click="deleteFromMyPlaylist()"><i class="fas fa-trash-alt"></i></a>
        </td>
        <newSongModal v-if="addNewSong" v-bind:track="this.song" v-model="addNewSong"></newSongModal>
    </tr>
</template>

<script>
  import newSongModal from './Modal/ModalAddNewSongToPlaylist';

  export default {
    name: 'Song',
    props: {
      song: null,
      index: 0,
      playlist: false,
      deleteFromPlaylist: Function
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
      getDuration() {
        return this.msToTime(this.song.trackTimeMillis);
      },
      playPreview() {
        if (this.audioPreview == null) {
          this.audioPreview = new Audio(this.song.previewUrl);
        }
        const id = `playBtn${this.song.trackId}`;
        const button = document.getElementById(id);
        if (button.classList.contains('fa-play-circle')) {
          button.classList.remove('fa-play-circle');
          button.classList.add('fa-pause-circle');
          this.audioPreview.play();
        } else {
          button.classList.remove('fa-pause-circle');
          button.classList.add('fa-play-circle');
          this.audioPreview.pause();
        }
      },
      addToMyPlaylist() {
        this.addNewSong = true;
      },
      deleteFromMyPlaylist() {
        this.deleteFromPlaylist(this.song.trackId);
      }
    },
    data() {
      return {
        addNewSong: false,
        audioPreview: null
      };
    }
  };
</script>

<style scoped>
  .add a {
    color: black;
  }
  #tr td:nth-child(1),
  .play, .add{
    max-width: 16px;
  }
  @media screen and (max-width: 1024px) {
    #tr td:nth-child(1),
    .play, .add{
      max-width: 25px;
    }
  }
</style>
