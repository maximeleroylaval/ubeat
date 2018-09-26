<template>

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">


      <router-link class="navbar-item" to="/">
        <img src="@/assets/logo.jpg" alt="UBeat app" height="128">
      </router-link>
      <div class="navbar-item is-hidden-desktop">
        <div class="field has-addons">
          <div class="control">
            <input class="input" type="text" placeholder="Search">
          </div>
          <div class="control">
            <a class="button is-dark">
              <i class="fas fa-search"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-item">
        <a role="button" class="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
        </a>
      </div>



    </div>

    <div class="navbar-menu" id="navMenu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/artist">Artist</router-link>
        <router-link class="navbar-item" to="/album">Album</router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item is-hidden-touch">
          <div class="field has-addons">
            <div class="control">
              <input class="input" type="text" placeholder="Search">
            </div>
            <div class="control">
              <a class="button is-dark">
                <i class="fas fa-search"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable is-hidden-touch">
          <a class="navbar-link">
            <i class="fas fa-user-circle fa-2x"></i>
          </a>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              User
            </div>
            <hr class="dropdown-divider">

            <a class="navbar-item">
              Settings
            </a>
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

<style>
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
</style>
