<template>
  <div class="modal is-active" id="modalAddNewSong">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new song</p>
        <button v-on:click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="control">
          <input v-model="track.trackName" class="input" type="text" placeholder="Name of the song">
          <input v-model="track.artistName" class="input" type="text" placeholder="Name of the artist">
          <input v-model="track.collectionName" class="input" type="text" placeholder="(Optionnal) Name of the collection">
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" v-on:click="addSong()">Save</button>
        <button class="button" v-on:click="closeModal">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api';
  import * as trackModel from '@/Model/Track';

  export default {
    name: 'ModalAddNewSong',
    props: {
      idPlaylist: null
    },
    methods: {
      openModal() {
        document.getElementById('modalAddNewSong').classList.add('is-active');
      },
      closeModal() {
        document.getElementById('modalAddNewSong').classList.remove('is-active');
        this.$emit('input', false);
      },
      async addSong() {
        const timestamp = new Date().getUTCMilliseconds();
        this.track.trackId = timestamp;

        console.log(JSON.stringify(this.track));
        const newTrack = await api.addSongToPlaylist(this.idPlaylist, JSON.stringify(this.track));
        console.log(newTrack);
        this.$emit('input', false);
      }
    },
    data() {
      return {
        track: trackModel
      };
    },
    created() {
    }
  };
</script>

<style scoped>

</style>
