<template>
  <div class="modal is-active" id="modalAddNewSong">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new song - {{ track.trackName }}</p>
        <button v-on:click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="container">
          <div v-if="!list">
            Loading...
          </div>
          <ul v-else>
            <li v-for="item in list" v-if="item.owner && item.owner.email === user.email" :key="item.id">
              <p><span>{{ item.name }}</span> - <a v-on:click="addSongToPlaylist(item.id)" title="Add this song to this playlist"><i class="fas fa-plus"></i></a></p>
            </li>
          </ul>
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
  import Playlist from './Playlist';

  export default {
    name: 'ModalAddNewSongToPlaylist',
    components: {
      Playlist
    },
    props: {
      track: null
    },
    methods: {
      openModal() {
        document.getElementById('modalAddNewSong').classList.add('is-active');
      },
      closeModal() {
        document.getElementById('modalAddNewSong').classList.remove('is-active');
        this.$emit('input', false);
      },
      async addSongToPlaylist(id) {
        console.log(this.track);
        await api.addSongToPlaylist(id, this.track);
        this.$emit('input', false);
      }
    },
    data() {
      return {
        user: null,
        list: null
      };
    },
    async created() {
      this.user = await api.getTokenInfo();
      if (!this.list) {
        this.list = await api.getAllPlaylist();
      }
    }
  };
</script>

<style scoped>

</style>
