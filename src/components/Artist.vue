

<template>
  <div id="Album" class="container">
    <div class="columns">
      <div class="column is-one-third jaq">
        <img src="@/assets/bigflo-oli-artist.jpg" alt="Jaquette d'album">
      </div>
      <div class="column has-vertically-aligned-content">
        <p class="title is-2">Biglo & Oli - RAP</p>
        <p class="subtitle is-4">2017 - 3 Albums</p>

        <div class="extern-buy">
          <a href="https://itunes.apple.com/fr/artist/bigflo-oli/806433543" target="_blank">
            <img src="@/assets/itunes_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="columns container-list-albums">
      <div class="column has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img class="img-album" src="https://i.scdn.co/image/ed4b3d73d77249c931b98c10a8ed5222a6e42716">
      </div>
      <div class="column has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img class="img-album" src="https://i.scdn.co/image/9b31facd15b50f8fc11882ddbe2252452149cedc">
      </div>
      <div class="column has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img class="img-album" src="https://i.scdn.co/image/3a0346c5b9f0d21a99a9d0094281066017d53228">
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
  .container-list-albums div {
    position:relative
  }
  .container-list-albums div .play {
    position:absolute;
    color:black;
    display: none;
  }
  .container-list-albums div:hover img {
    opacity: 0.7;
  }
  .container-list-albums div:hover .play{
    display: block;
    z-index: 2;
  }

.img-album{
  width: 256px;
  height: 256px;
}
  #playlist tr td:nth-child(1),
  #playlist tr td:nth-child(2){
    max-width: 16px;
  }
</style>
