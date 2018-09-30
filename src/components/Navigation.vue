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
        <a class="navbar-item" >Playlist</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
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


        <div class="navbar-item has-dropdown is-hoverable" id="dropdown-user">
          <a class="navbar-link is-hidden-touch">
            <i class="fas fa-user-circle fa-2x"></i>
          </a>
          <div class="navbar-dropdown">
            <div class="navbar-item">
              <i class="fas fa-user-circle fa-2x is-hidden-desktop"></i>
              John Doe
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
