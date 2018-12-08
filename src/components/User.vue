<template>
  <div class="container">
    <h4 class="title is-2">User</h4>
    <hr>
    <div class="headline" v-if="user">
     <p><b>Username : </b> {{ user.name }}

        <a v-if="loading">
        </a>
        <a v-on:click="unfollowUser(user.id)" id="btn-ami" class="button" v-else-if="isFriend">
          Unfollow this user
        </a>
        <a v-on:click="followUser" class="button" id="btn-ami" v-else>
          Follow this user
        </a>

      </p>
      <p><b>Email : </b> {{ user.email }}</p>
      <br>
    </div>
    <h4 class="title is-2">Playlist</h4>
    <hr>
    <div v-if="!list">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-else-if="list.length === 0">
      This user has no Playlist
    </div>
    <table v-else id="playlists" class="table is-narrow is-hoverable is-fullwidth">
      <thead>
      <tr>
        <th>Name</th>
        <th>Number of tracks</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <router-link v-bind:to="{ name: 'Playlist', params: { id: item.id }}" :key="item.id">
          <td>{{ item.name }}</td>
        </router-link>
        <td>{{ item.tracks.length }}</td>
      </tr>
      </tbody>
    </table>
    <br>
    <h4 class="title is-2">Friends</h4>
    <hr>
    <div v-if="!friends">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-else-if="friends.length === 0">
      This user has no friend
    </div>
    <ul v-else>
      <li v-for="item in friends">
        <router-link v-bind:to="{ name: 'User', params: { id: item.id }}" >
          <span >{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script>
  /* eslint-disable no-trailing-spaces,spaced-comment */

  import * as api from '@/api';
  import * as User from '@/models/User';

  export default {
    name: 'User',
    props: {
    },
    data() {
      return {
        id: this.$route.params.id,
        user: User,
        list: null,
        friends: null,
        registeredUser: User,
        isFriend: null,
        loading: true
      };
    },
    beforeRouteUpdate(to, from, next) {
      this.id = to.params.id;
      this.init();
      next();
    },
    methods: {
      followUser() {
        document.getElementById('btn-ami').classList.add('is-loading');
        api.followUser(this.id, () => {
          document.getElementById('btn-ami').classList.remove('is-loading');
          this.isFriend = true;
        });
      },
      unfollowUser(id) {
        document.getElementById('btn-ami').classList.add('is-loading');
        api.unfollowUser(id, () => {
          document.getElementById('btn-ami').classList.remove('is-loading');
          this.isFriend = false;
        });
      },
      hasFriends() {
        let check = false;
        for (let i = 0; i < this.registeredUser.following.length; i += 1) {
          if (this.registeredUser.following[i].id === this.user.id) {
            this.loading = false;
            check = true;
            this.isFriend = true;
          }
        }
        if (!check) {
          this.loading = false;
          this.isFriend = false;
        }
      },
      filteredPlaylistsOwner() {
        return this.list.filter(entry => entry.owner != null);
      },
      filteredPlaylistsId() {
        return this.list.filter(entry => entry.owner.id === this.id);
      },
      async init() {
        this.loading = true;
        this.isFriend = false;
        this.user = null;
        this.list = null;
        this.friends = null;
        this.registeredUser = null;

        this.user = await api.getUser(this.id);
        this.friends = this.user.following;

        this.list = await api.getAllPlaylist();
        this.list = this.filteredPlaylistsOwner();
        this.list = this.filteredPlaylistsId();

        const tmpUser = await api.getTokenInfo();
        this.registeredUser = await api.getUser(tmpUser.id);

        if (this.registeredUser.id !== this.user.id) {
          this.hasFriends();
        }
      }
    },
    async created() {
      this.init();
    }
  };
</script>

<style scoped>
  td {
    border: none;
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
