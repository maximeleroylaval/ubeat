

<template>
  <div id="Album" class="container">
    <div class="columns">
      <div class="column is-one-third jaq has-text-centered">
        <img src="@/assets/img/bigflo-oli-artist.jpg" alt="Jaquette d'album">
      </div>
      <div class="column has-vertically-aligned-content left">
        <p class="title is-2">Biglo & Oli - RAP</p>
        <p class="subtitle is-4">1 Album</p>

        <div class="extern-buy">
          <a href="https://itunes.apple.com/fr/artist/bigflo-oli/806433543" target="_blank">
            <img src="@/assets/img/itunes_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="columns container-list">
      <div class="column">
        <router-link to="/Album">
          <div class="box has-text-centered">
            <i class="far fa-play-circle fa-4x play"></i>
            <img src="https://i.scdn.co/image/3a0346c5b9f0d21a99a9d0094281066017d53228">
            <p>La vraie vie</p>
          </div>

        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
  #Album {
    padding-top: 40px;
  }
  .jaq img {
    border-radius: 50%;
    margin-bottom: 40px;
  }
  .extern-buy img {
    max-width: 60px;
  }
  .container-list .box:hover img {
    opacity: 0.7;
  }
  .container-list .box:hover .play{
    display: block;
    z-index: 2;
  }
  .container-list .box svg {
    position:absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    color:black;
    display: none;
  }
</style>
