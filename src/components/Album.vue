<template>
  <div id="Album" class="container">
    <div class="columns is-centered header">
      <div class="column is-one-third jaq">
        <img src="@/assets/img/album.jpg" alt="Jaquette d'album">
      </div>
      <div class="column has-vertically-aligned-content left">
        <p class="title is-1">{{ album[0].title }}</p>
        <p class="subtitle is-4">{{ album[0].artist }} - {{ album[0].kind }}</p>
        <p class="subtitle is-6">{{ album[0].releaseYear }} - {{ album[0].songs.length }} tracks - 2 h 6 min</p>
        <div class="extern-buy">
          <a href="https://itunes.apple.com/fr/album/la-vraie-vie/1240295989" target="_blank">
            <img src="@/assets/img/itunes_logo.png">
          </a>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">

        <table id="playlist" class="table is-narrow is-hoverable is-fullwidth">
          <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Title</th>
            <th>Duration</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="song in album[0].songs">
            <td>{{ song.number }}</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>{{ song.title }}</td>
            <td>{{ song.duration }}</td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        album: [
          {
            artist: 'Bigflo & Oli',
            title: 'La vraie vie (Deluxe)',
            releaseYear: '2017',
            kind: 'RAP',
            songs: [
              {
                number: 1,
                title: 'La vraie vie',
                duration: '8:06'
              },
              {
                number: 2,
                title: 'Alors alors',
                duration: '3:55'
              },
              {
                number: 3,
                title: 'Personne',
                duration: '4:29'
              },
              {
                number: 4,
                title: 'Salope !',
                duration: '4:21'
              },
              {
                number: 5,
                title: 'Trop tard',
                duration: '5:05'
              },

              {
                number: 6,
                title: 'Papa',
                duration: '5:17'
              },
              {
                number: 7,
                title: 'Répondez-moi',
                duration: '5:58'
              },
              {
                number: 8,
                title: 'Olivio',
                duration: '5:05'
              },
              {
                number: 9,
                title: 'La vie normale',
                duration: '4:47'
              },
              {
                number: 10,
                title: 'Autre part',
                duration: '6:22'
              },
              {
                number: 11,
                title: 'Dommage',
                duration: '3:56'
              },
              {
                number: 12,
                title: 'Ça va trop vite (feat. Busta Rhymes)',
                duration: '4:23'
              },
              {
                number: 13,
                title: 'Sac à dos',
                duration: '5:05'
              },
              {
                number: 14,
                title: 'Dans mon lit',
                duration: '7:07'
              },
              {
                number: 15,
                title: 'Je suis',
                duration: '4:37'
              },
              {
                number: 16,
                title: 'Cigarette',
                duration: '5:25'
              },
              {
                number: 17,
                title: 'Dites rien à ma mère',
                duration: '3:58'
              },
              {
                number: 18,
                title: 'Dommage (acoustique)',
                duration: '3:32'
              },
              {
                number: 19,
                title: 'Pour un pote (feat. Jean Dujardin)',
                duration: '4:52'
              },
              {
                number: 20,
                title: 'À mon retour',
                duration: '5:12'
              },
              {
                number: 21,
                title: 'Début d\'Empire',
                duration: '6:43'
              },
              {
                number: 22,
                title: 'La Tempête',
                duration: '5:18'
              },
              {
                number: 23,
                title: 'Du disque dur au disque d\'or',
                duration: '5:17'
              },
              {
                number: 24,
                title: 'Mytho',
                duration: '3:37'
              },
              {
                number: 25,
                title: 'Shape of You (de Berywam)',
                duration: '3:17'
              }

            ]
          }
        ]
      };
    }
  };
</script>

<style>
  #Album {
    padding-top: 40px;
  }
  .header {
    margin-bottom: 40px;
  }
  .jaq img {
    border-radius: 50%;
  }
  .extern-buy img {
    max-width: 60px;
  }

  #playlist tr td:nth-child(1),
  #playlist tr td:nth-child(2){
    max-width: 16px;
  }

  @media screen and (max-width: 1024px) {
    #playlist tr td:nth-child(1),
    #playlist tr td:nth-child(2){
      max-width: 25px;
    }
  }
</style>
