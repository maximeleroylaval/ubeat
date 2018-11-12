<template>
    <tr>
        <td>{{ this.index + 1 }}</td>
        <td class="add"><a v-on:click="addNewSong = true" title="Add this song to a playlist"><i class="fas fa-plus"></i></a></td>
        <td class="play"><a v-on:click="playPreview()" title="Play this song"><i class="fas fa-play-circle"></i></a></td>
        <td>{{ this.song.trackName }}</td>
        <td>{{ getDuration() }}</td>
    </tr>
</template>

<script>
    export default {
      name: 'Song',
      props: {
        song: null,
        index: 0
      },
      components: {
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
          this.audioPreview.play();
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
