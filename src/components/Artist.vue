

<template>
  <div id="Album" class="container">
      <article class="media">
        <div class="column is-one-third">
          <img src="@/assets/bigflo-oli-artist.jpg" alt="Jaquette d'album">
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title is-2">Biglo & Oli - RAP</p>
            <p class="subtitle is-4">2017 - 3 Albums</p>

            <div class="extern-buy">
              <a href="https://itunes.apple.com/fr/artist/bigflo-oli/806433543" target="_blank">
                <img src="@/assets/itunes_logo.png">
              </a>
            </div>
          </div>
        </div>
      </article>
    <div class="columns container-list-albums">
      <div class="column is-2-desktop-only is-6-mobile has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2-desktop-only is-6-mobile has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2-desktop-only is-6-mobile has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2-desktop-only is-6-mobile has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2-desktop-only is-6-mobile has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2-desktop-only is-6-mobile has-vertically-aligned-content">
        <a class="play"><i class="far fa-play-circle fa-4x"></i></a>
        <img src="https://bulma.io/images/placeholders/256x256.png">
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


  #playlist tr td:nth-child(1),
  #playlist tr td:nth-child(2){
    max-width: 16px;
  }
</style>
