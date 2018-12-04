<template>
  <div>
    <h4 class="title is-2">User</h4>
    <div v-if="!user">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div class="headline" v-else>
      <p class="title is-5">{{ user.name }}</p>
      <p class="title is-6">{{ user.email }}</p>

      <div v-if="registeredUser && user.id !== registeredUser.id">
        <a v-on:click="unfollowUser" class="button" v-if="isFriend">
          Unfollow this user
        </a>
        <a v-on:click="followUser" class="button" v-else>
          Follow this user
        </a>
      </div>


    </div>

    <h4 class="title is-2">Playlist</h4>
    <div v-if="!list">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-else-if="list.size === 0">
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
        <router-link v-bind:to="{ name: 'Playlist', params: { id: item.id }}"  >
          <td>{{ item.name }}</td>
        </router-link>
        <td>{{ item.tracks.length }}</td>
      </tr>
      </tbody>
    </table>
    <h4 class="title is-2">Friends</h4>
    <div v-if="!friends">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <ul v-else>
      <li v-for="item in friends">
        {{ item.name }}
      </li>
    </ul>
  </div>

</template>

<script>
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
        isFriends: null
      };
    },
    methods: {
      followUser() {
        api.followUser(this.id, () => {});
      },
      hasFriends() {
        for (let i = 0; i < this.registeredUser.following.length; i += 1) {
          for (let j = 0; j < this.user.following.length; j += 1) {
            if (this.registeredUser.following[i].id === this.user.following[j].id) {
              this.isFriend = true;
            }
          }
        }
      },
      filteredPlaylistsOwner() {
        return this.list.filter(entry => entry.owner != null);
      },
      filteredPlaylistsId() {
        return this.list.filter(entry => entry.owner.id === this.id);
      },
    },
    async created() {
      this.isFriend = false;
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
  td {
    border: none;
  }
</style>
