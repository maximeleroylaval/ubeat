<template>
  <div class="container">
    <div class="center" v-if="!namePlaylist">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
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
        <song v-for="(item, index) in tracks" :key="index" v-bind:song="item" v-bind:index="index" v-bind:playlist="true" v-bind:deleteFromPlaylist="deleteSongFromPlaylist"/>
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
  import newSongModal from '@/components/Modal/ModalAddNewSong';
  import song from '@/components/Song';

  export default {
    name: 'Playlist',
    components: {
      newSongModal,
      song
    },
    props: {
    },
    methods: {
      updatePlaylist() {
        document.getElementById('btn-save').classList.add('is-loading');
        document.getElementById('btn-save').setAttribute('disabled', true);
        if (api.updatePlaylist(this.idPlaylist, this.newName) === false) {
          this.$emit('logOut');
        } else {
          this.namePlaylist = this.newName;
          this.newName = '';
        }
        this.closeModal();
      },
      deleteSongFromPlaylist(id) {
        const ret = api.deleteSongFromPlaylist(this.idPlaylist, id);
        if (ret === false) {
          this.$emit('logOut');
        } else {
          for (let i = 0; i < this.tracks.length; i += 1) {
            if (id === this.tracks[i].trackId) {
              this.tracks.splice(i, 1);
            }
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
      if (play === false) {
        this.$emit('logOut');
      } else {
        this.namePlaylist = play.name;
        this.tracks = play.tracks;
      }
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
