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
            </a>
            <div class="navbar-dropdown">
              <div class="navbar-item">
                <i class="fas fa-user-circle fa-2x is-hidden-desktop"></i>
                <span >{{ user.email }}</span>
              </div>
              <hr class="dropdown-divider">

              <a class="navbar-item">
                Profil
              </a>
              <a class="navbar-item">
                Log out
              </a>
            </div>
          </div>
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control">
                <input class="input" v-model="input" type="text" placeholder="Search">
              </div>
              <div class="control">
                <select v-model="selected">
                  <option value="global">All</option>
                  <option value="artists/">Artist</option>
                  <option value="albums/">Album</option>
                  <option value="tracks/">Track</option>
                  <option value="users/">User</option>
                </select>
                <router-link v-bind:to="{ name: 'Search', params: { type:selected }, query : {q:input}}" >
                  <i class="fas fa-search"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    props: {
      user: null,
    },
    data() {
      return {
        input: '',
        selected: 'global'
      };
    },
    components: {
    }
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
</style>
