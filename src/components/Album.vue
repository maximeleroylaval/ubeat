<template>
  <div id="Album" class="container">
    <div class="box">
      <article class="media">
        <div class="column is-one-third jaq">
          <img src="@/assets/album.jpg" alt="Jaquette d'album">
        </div>
        <div class="media-content">
          <div class="content">
            <p class="title is-1">La vraie vie (Deluxe)</p>
            <p class="subtitle is-4">Biglo & Oli - RAP</p>
            <p class="subtitle is-6">2017 - 25 titres - 2 h 6 min</p>


            <div class="extern-buy">
              <a href="https://itunes.apple.com/fr/artist/bigflo-oli/806433543" target="_blank">
                <img src="@/assets/itunes_logo.png">
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
    <div class="columns">


      <!--<ul id="example-1">
        <li v-for="item in items">
          {{ item.message }}
        </li>
      </ul>-->
      <div class="column">

        <table id="playlist" class="table is-narrow is-hoverable is-fullwidth">
          <tbody>
          <tr>
            <td>#</td>
            <td></td>
            <td>Titre</td>
            <td>Temps</td>
          </tr>
          <tr>
            <td>1</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>La vraie vie</td>
            <td>8:06</td>
          </tr>
          <tr>
            <td>2</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Alors alors</td>
            <td>3:55</td>
          </tr>
          <tr>
            <td>3</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Personne</td>
            <td>4:31</td>
          </tr>
          <tr>
            <td>4</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>S****e</td>
            <td>4:23</td>
          </tr>
          <tr>
            <td>5</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Trop tard</td>
            <td>5:07</td>
          </tr>
          <tr>
            <td>6</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Papa</td>
            <td>5:18</td>
          </tr>
          <tr>
            <td>7</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Répondez-moi</td>
            <td>6:00</td>
          </tr>
          <tr>
            <td>8</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Olivio</td>
            <td>5:07</td>
          </tr>
          <tr>
            <td>9</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>La vie normale</td>
            <td>4:49</td>
          </tr>
          <tr>
            <td>10</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Autre part</td>
            <td>6:24</td>
          </tr>
          <tr>
            <td>11</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Dommage</td>
            <td>3:58</td>
          </tr>
          <tr>
            <td>12</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Ça va trop vite</td>
            <td>4:25</td>
          </tr>
          <tr>
            <td>13</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Sac à dos</td>
            <td>5:27</td>
          </tr>
          <tr>
            <td>14</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Dans mon lit</td>
            <td>7:05</td>
          </tr>
          <tr>
            <td>15</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Je suis</td>
            <td>4:35</td>
          </tr>
          <tr>
            <td>16</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Cigarette</td>
            <td>5:25</td>
          </tr>
          <tr>
            <td>17</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Dites rien à ma mère</td>
            <td>3:58</td>
          </tr>
          <tr>
            <td>18</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Dommage (Acoustic)</td>
            <td>3:32</td>
          </tr>
          <tr>
            <td>19</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Pour un pote (feat. Jean Dujardin) [Bande originale du film "Brice 3"]</td>
            <td>4:52</td>
          </tr>
          <tr>
            <td>20</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>À mon retour</td>
            <td>5:12</td>
          </tr>
          <tr>
            <td>21</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Début d'empire</td>
            <td>6:43</td>
          </tr>
          <tr>
            <td>22</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>La tempête</td>
            <td>5:18</td>
          </tr>
          <tr>
            <td>23</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Du disque dur au disque d'or</td>
            <td>5:17</td>
          </tr>
          <tr>
            <td>24</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Mytho</td>
            <td>3:37</td>
          </tr>
          <tr>
            <td>25</td>
            <td><i class="fas fa-play-circle"></i></td>
            <td>Shape of You</td>
            <td>3:17</td>
          </tr>
          </tbody>
        </table>

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

  #playlist tr td:nth-child(1),
  #playlist tr td:nth-child(2){
    max-width: 16px;
  }
</style>
