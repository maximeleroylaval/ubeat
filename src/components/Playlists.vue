<template>
  <div>
    <div class="center" v-if="!list" >
      <div class="lds-dual-ring"></div>
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
        <tr v-for="item in list" v-if="item.owner && item.owner.email === user.email" :key="item.id">
          <router-link v-bind:to="{ name: 'Playlist', params: { id: item.id }}"  >
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
          <button class="button is-success" v-on:click="createPlaylist()">Save</button>
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
      deletePlaylist(id) {
        api.deletePlaylist(id);
        for (let i = 0; i < this.list.length; i += 1) {
          if (id === this.list[i].id) {
            this.list.splice(i, 1);
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
        const newPlaylist = await api.createPlaylist(this.nameNewPaylist);
        if (newPlaylist) {
          this.list.push(newPlaylist);
        } else {
          alert('An error occured');
        }
        this.closeModal();
      }
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
      this.list = await api.getAllPlaylist();
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


</style>
