<template>
<div>
  <div v-if="namePlaylist">
    <div class="head">
      <h1 class="title is-1">{{ namePlaylist }}</h1>
      <a class="button" v-on:click="openModal"><i class="fas fa-pen"></i></a>
    </div>

    <table id="playlists" class="table is-narrow is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th>#</th>
        <th></th>
        <th>Name</th>
        <th>Artist</th>
        <th>Album</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in tracks">
        <td>{{ index + 1 }}</td>
        <td class="play"><a title="Play this song"><i class="fas fa-play-circle"></i></a></td>
        <td>{{ item.trackName }}</td>
        <td>{{ item.artistName }}</td>
        <td>{{ item.collectionName }}</td>
        <td>
          <a class="button" v-on:click="deleteSongFromPlaylist(item.trackId)"><i class="fas fa-trash-alt"></i></a>
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
          <button id="btn-save" class="button is-success" v-on:click="updatePlaylist()">Save</button>
          <button class="button" v-on:click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>



</div>
</div>

</template>

<script>
  import * as api from '@/api';
  import * as track from '@/models/Track';
  import newSongModal from './Modal/ModalAddNewSong';

  export default {
    name: 'Playlist',
    components: {
      newSongModal
    },
    props: {
    },
    methods: {
      updatePlaylist() {
        document.getElementById('btn-save').classList.add('is-loading');
        document.getElementById('btn-save').setAttribute('disabled', true);
        api.updatePlaylist(this.idPlaylist, this.newName);
        this.namePlaylist = this.newName;
        this.newName = '';
        this.closeModal();
      },
      deleteSongFromPlaylist(id) {
        api.deleteSongFromPlaylist(this.idPlaylist, id);
        for (let i = 0; i < this.tracks.length; i += 1) {
          if (id === this.tracks[i].trackId) {
            this.tracks.splice(i, 1);
          }
        }
      },
      openModal() {
        document.getElementById('modal').classList.add('is-active');
        document.getElementById('input-name').focus();
      },
      closeModal() {
        document.getElementById('modal').classList.remove('is-active');
      },
      addSong(item) {
        this.tracks.push(item);
      }
    },
    async mounted() {
      const play = await api.getPlaylist(this.idPlaylist);

      this.namePlaylist = play.name;
      this.tracks = play.tracks;
    },
    data() {
      return {
        idPlaylist: this.$route.params.id,
        namePlaylist: null,
        newName: null,
        tracks: track,
        addNewSong: false
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
