<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="@/assets/img/LogoTextOnly.png" alt="UBeat app" height="128">
      </router-link>
      <div class="navbar-item right">
        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </a>
      </div>
    </div>
    <div class="navbar-menu" id="navMenu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/playlists" v-bind:user="user">Playlist</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field has-addons">
            <div class="control search">
              <input class="input custom" v-on:keyup="keymonitor" v-model="input" type="text" placeholder="Search" @keyup.enter="push">
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
            <select class="classic" v-model="selected" v-on:change="clear">
              <option value="global">All</option>
              <option value="artists/">Artist</option>
              <option value="albums/">Album</option>
              <option value="tracks/">Track</option>
              <option value="users/">User</option>
            </select>
            <div class="control">
              <router-link v-bind:to="{ name: 'Search', params: { type:selected }, query : {q:input}}">
                <button ref="search" class="button custom"><i class="fas fa-search"></i></button>
              </router-link>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable" id="dropdown-user" v-if="user">
          <a class="navbar-link is-hidden-touch">
            <i class="fas fa-user-circle fa-2x"></i>
            {{ user.name }}
          </a>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <i class="fas fa-user-circle fa-2x is-hidden-desktop"></i>
              {{ user.email }}
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
        setTimeout(() => {
          this.getData();
        }, 500);
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
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .175);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .175);
    z-index: 1000;
  }

  .result-bucket li {
    padding: 7px 15px;
  }
  select.classic {
  }
  select.classic {

    /* styling */
    border-radius: 0;
    border: 0;
    background-color: white;
    display: inline-block;
    font: inherit;
    padding: 0.2em 2.2em 0.2em 0.5em;

    /* reset */

    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
  }


  /* arrows */

  select.classic {
    background-image:
      linear-gradient(45deg, transparent 50%, #000000 50%),
      linear-gradient(135deg, #000000 50%, transparent 50%),
      linear-gradient(to right, #cecece, #cecece);
    background-position: calc(100% - 15px) calc(1em + -1px), calc(100% - 10px) calc(1em + -1px), 100% 0;
    background-size: 5px 5px, 5px 5px, 1.9em 2.5em;
    background-repeat: no-repeat;
  }

  .input.custom {
    border-radius: 0;
    border: 0;
    border-right: gray;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
  }

  .button.custom {
    border-radius: 0;
    border: 0;
  }


</style>
