<template>
  <div id="Album" class="container">
    <div class="box">
      <article class="media">
        <div class="column is-one-third jaq">
          <img src="@/assets/album.jpg" alt="Jaquette d'album">
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title is-1">Biglo & Oli - RAP</p>


            <div class="extern-buy">
              <a href="https://itunes.apple.com/fr/artist/bigflo-oli/" target="_blank">
                <img src="@/assets/itunes_logo.png">
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="columns">
      <div class="column is-2 album-section">
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2 album-section">
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2 album-section">
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2 album-section">
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2 album-section">
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2 album-section">
        <img src="https://bulma.io/images/placeholders/256x256.png">
      </div>
      <div class="column is-2 album-section">
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
  .album-section{
    max-width: 256px;
    margin-left: 10px;
  }

  #playlist tr td:nth-child(1),
  #playlist tr td:nth-child(2){
    max-width: 16px;
  }
</style>

