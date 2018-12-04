<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/assets/img/LogoTextOnly.png" alt="UBeat app" height="128">
      </router-link>
      <div class="navbar-item right">
        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu" id="navMenu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/playlists" v-bind:user="user">Playlist</router-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable" id="dropdown-user" v-if="user">
            <a class="navbar-link is-hidden-touch">
              <i class="fas fa-user-circle fa-2x"></i>
              {{ user.name }}
            </a>
            <div class="navbar-dropdown">
              <div class="navbar-item">
                <i class="fas fa-user-circle fa-2x is-hidden-desktop"></i>
                <router-link v-bind:to="{ name: 'User', params: { id: user.id }}" >
                  <span >{{ user.email }}</span>
                </router-link>
              </div>
              <hr class="dropdown-divider">
              <router-link class="navbar-item" v-bind:to="{ name: 'User', params: { id: user.id }}" >
                Profil
              </router-link>
              <a class="navbar-item">
                Log out
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control search">
              <input class="input "v-on:keyup="keymonitor" v-model="input" type="text" placeholder="Search" @keyup.enter="push">
              <div class="instant-results">
                <ul class="list-unstyled result-bucket" id="match">
                  <li class="result-entry"  v-for="item in this.data">
                    <a v-on:click="insertInsideInput(item)">
                      <h4 class="media-heading">{{item}}</h4>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="control">
              <router-link v-bind:to="{ name: 'Search', params: { type:selected }, query : {q:input}}">
                <button ref="search" class="button"><i class="fas fa-search"></i></button>
              </router-link>
              <select v-model="selected" v-on:change="clear">
                <option value="global">All</option>
                <option value="artists/">Artist</option>
                <option value="albums/">Album</option>
                <option value="tracks/">Track</option>
                <option value="users/">User</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import * as api from '@/api';

  export default {
    name: 'Navigation',
    props: {
      user: null,
    },
    data() {
      return {
        input: '',
        selected: 'global',
        data: []
      };
    },
    components: {
    },
    methods: {
      keymonitor: function key() {
        this.getData();
      },
      insertInsideInput: function insertInsideInput(element) {
        this.input = element;
        this.data = '';
        this.$refs.search.click();
      },
      parseData: function parseData() {
        let arr = [];
        if (this.type !== 'users/') {
          Object.entries(this.data.results).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(key[1], 'trackName')) {
              arr.push(key[1].trackName);
            } else if (Object.prototype.hasOwnProperty.call(key[1], 'artistName')) {
              arr.push(key[1].artistName);
            } else {
              arr.push(key[1].collectionName);
            }
          });
        } else {
          Object.entries(this.data).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(key[1], 'name')) {
              arr.push(key[1].name);
            }
          });
          arr = arr.slice(0, 10);
        }
        return arr;
      },
      push: function submit() {
        this.data = '';
        this.$refs.search.click();
      },
      clear: function clear() {
        this.data = '';
        this.getData();
      },
      async getData() {
        if (this.selected === 'global') {
          this.type = '';
        } else {
          this.type = this.selected;
        }
        console.log(this.input);
        if (this.input.length > 2) {
          this.data = await api.searchGlobalLimit(this.type, this.input);
          this.data = this.parseData();
          this.data = [...(new Set(this.data))];
        } else {
          this.data = '';
        }
      }
    },
  };


  document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach((el) => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  });
</script>

<style scoped>
  .navbar {
    background-color: #ECEFF1;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);

  }
  .navbar-link::after {
    border-color: black;
  }
  .navbar-burger span {
    color: black;
  }
  .navbar-item.right {
    margin-left: auto;
    margin-right: 0;
  }


  @media screen and (max-width: 1087px) {
    #dropdown-user .dropdown-divider {
      display: none;
    }
  }

  .result-entry {
    border-top:1px solid #ddd;
  }
  .search {
    position: relative;
    width: 130px;
  }
  .search div {
    position: absolute;
  }

  .instant-results {
    background: #fff;
    width: 100%;
    color: gray;
    position: absolute;
    top: 100%;
    left: 0;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .175);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .175);
    z-index: 1000;
  }

  .result-bucket li {
    padding: 7px 15px;
  }

</style>
