<template>
    <footer class="myfooter">
        <div class="name">
            <p id="globalSongName"></p>
        </div>
        <a v-on:click="play()" title="Play this song">
            <i id="globalPlay" class="fas fa-play play"/>
        </a>
        <div class="volume">
            <input v-model="volume" @input="setVolume()" type="range" min="0" max="100" value="100" step="1">
        </div>
    </footer>
</template>

<script>
  import * as player from '@/player';

  export default {
    name: 'Footer',
    props: {
    },
    data() {
      return {
        volume: 100
      };
    },
    methods: {
      play() {
        if (player.isPlaying()) {
          player.pause();
        } else {
          player.play();
        }
      },
      setVolume() {
        player.setVolume(this.volume);
      }
    }
  };
</script>

<style scoped>
.myfooter {
   position:fixed;
   left:0px;
   bottom:0px;
   height:40px;
   width:100%;
   background-color: #282828;
   text-align: center;
   padding-top: 6px;
}
.play {
    color: white;
}
.volume {
    position: fixed;
    display: inline;
    right:0;
    padding-right: 4%;
    padding-top: 3px;
}
.name {
    width: 42%;
    position: fixed;
    display: inline;
    left:0;
    padding-left: 4%;
    color:white;
    overflow: hidden;
    white-space: nowrap;
}
</style>
