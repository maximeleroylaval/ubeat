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
            <div class="spinner">
              <div class="bounce1"></div>
              <div class="bounce2"></div>
              <div class="bounce3"></div>
            </div>
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
        console.log(JSON.stringify(this.track));
        await api.addSongToPlaylist(id, JSON.stringify(this.track));
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
      this.list = await api.getAllPlaylist();
    }
  };
</script>

<style scoped>
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
