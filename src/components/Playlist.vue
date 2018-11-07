<template>

  <div v-if="name">
    <div class="head">
      <h1 class="title is-1">{{ name }}</h1>
      <a class="button" v-on:click="openModal"><i class="fas fa-pen"></i></a>
    </div>

    <table id="playlists" class="table is-narrow is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th>Name</th>
        <th>Artist</th>
        <th>Album</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tracks">
        <td>{{ item.trackName }}</td>
        <td>{{ item.artistName }}</td>
        <td>{{ item.collectionName }}</td>
        <td>
          <a class="button" v-on:click="deleteSong(item.trackId)"><i class="fas fa-trash-alt"></i></a>
        </td>
      </tr>
      </tbody>
    </table>


    <div class="modal" id="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Change playlist name</p>
          <button v-on:click="closeModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <input id="input-name" v-model="newName" class="input" type="text" placeholder="Enter name">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" v-on:click="updatePlaylist()">Save</button>
          <button class="button" v-on:click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
  import * as api from '@/api';
  import * as track from '@/Model/Track';

  export default {
    name: 'Playlist',
    props: {
    },
    methods: {
      updatePlaylist() {
        api.updatePlaylist(this.idPlaylist, this.newName);
        this.name = this.newName;
        this.newName = '';
        this.closeModal();
      },
      deleteSong() {
      },
      openModal() {
        document.getElementById('modal').classList.add('is-active');
        document.getElementById('input-name').focus();
      },
      closeModal() {
        document.getElementById('modal').classList.remove('is-active');
      },
      addSong() {
      }
    },
    async created() {
      const play = await api.getPlaylist(this.idPlaylist);
      this.name = play.name;
      this.tracks = play.tracks;
    },
    data() {
      return {
        idPlaylist: this.$route.params.id,
        name: null,
        newName: null,
        tracks: track,
      };
    }
  };
</script>

<style scoped>
  .head * {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 0;
  }
  table {
    margin-top: 50px;
  }

</style>
