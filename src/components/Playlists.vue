<template>
  <div class="container">
    <div class="center" v-if="!list" >
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-if="list" >
      <table id="playlists" class="table is-narrow is-hoverable is-fullwidth">
        <thead>
        <tr>
          <th>Name</th>
          <th>Number of tracks</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list">
          <router-link v-bind:to="{ name: 'Playlist', params: { id: item.id }}"  v-on:logOut="logout" >
            <td>{{ item.name }}</td>
          </router-link>
          <td>{{ item.tracks.length }}</td>
          <td>
            <a v-on:click="deletePlaylist(item.id)">
              <i class="far fa-trash-alt"></i>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
      <a class="button" v-on:click="openModal">Create new playlist</a>
    </div>
    <div class="modal" id="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new Playlist</p>
          <button v-on:click="closeModal" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="control">
            <input id="input-name" v-model="nameNewPaylist" class="input" type="text" placeholder="Enter name">
          </div>
        </section>
        <footer class="modal-card-foot">
          <button id="btn-save" class="button is-success" v-on:click="createPlaylist()">Save</button>
          <button class="button" v-on:click="closeModal">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-alert */

  import * as api from '@/api';

  export default {
    name: 'Playlists',
    components: {
    },
    props: {
    },
    methods: {
      logout() {
        this.$emit('logOut');
      },
      deletePlaylist(id) {
        const ret = api.deletePlaylist(id);
        if (ret === false) {
          this.$emit('logOut');
        } else {
          for (let i = 0; i < this.list.length; i += 1) {
            if (id === this.list[i].id) {
              this.list.splice(i, 1);
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
      async createPlaylist() {
        document.getElementById('btn-save').classList.add('is-loading');
        document.getElementById('btn-save').setAttribute('disabled', true);
        const newPlaylist = await api.createPlaylist(this.nameNewPaylist);
        if (newPlaylist) {
          this.list.push(newPlaylist);
        } else {
          this.$emit('logOut');
        }
        this.closeModal();
      },
      filteredPlaylistsOwner() {
        return this.list.filter(entry => entry.owner != null);
      },
      filteredPlaylistsId() {
        return this.list.filter(entry => entry.owner.id === this.user.id);
      },
    },
    data() {
      return {
        user: null,
        list: null,
        nameNewPaylist: null,
        token: null
      };
    },
    mounted() {
    },
    async created() {
      this.user = await api.getTokenInfo();
      if (this.user === false) {
        this.user = null;
        this.$emit('logOut');
      } else {
        this.list = await api.getAllPlaylist();
        if (this.list === false) {
          this.$emit('logOut');
        } else {
          this.list = this.filteredPlaylistsOwner();
          this.list = this.filteredPlaylistsId();
        }
      }
    }
  };
</script>,

<style scoped>
  td {
    border: none;
  }
  .center {
    position:fixed;
    top: 50%;
    left: 50%;
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


