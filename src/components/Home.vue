<template>
  <div id="Home" class="container">
    <div class="columns">
      <div class="column has-vertically-aligned-content left">
        <p class="title-home title is-3">Artist</p>
        <hr>
      </div>
    </div>
    <div class="columns container-list">
      <div class="column is-one-third  is-one-third-tablet has-text-centered">
        <router-link to="/Artist">
          <img class="img-home" src="@/assets/bigflo-oli-artist.jpg" alt="Jaquette d'album">
          <p>BigFlo et Oli</p>
        </router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column has-vertically-aligned-content left">
        <p class="title is-3 title-home">Albums</p>
        <hr>
      </div>
    </div>
    <div class="columns container-list">
      <div class="column is-one-third  is-one-third-tablet has-text-centered">
        <router-link to="/Album">
          <img class="img-home" src="@/assets/album.jpg" alt="Jaquette d'album">
          <p>La vrai vie</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
  .container-list div {
    position:relative
  }
  .container-list div a {
    display: block;
  }
  .container-list div:hover img {
    opacity: 0.7;
  }
  .img-home{
    width: 256px;
    height: 256px;
  }
  p.title-home.title.is-3
  {
    margin-bottom: 5px;
  }
  #Home {
    padding-top: 40px;
  }
</style>
