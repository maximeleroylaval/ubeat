<template>
  <div>
    <div v-if="!loading" >
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
    <div v-if="loading" >
      <div v-if="this.type === 'albums/' || this.type === ''" >
      <div class="columns">
        <div class="column">
          <p class="title is-3 title-home">Albums</p>
          <hr>
        </div>
      </div>
      <div class="container-list">
        <div class="box-album" v-for="item in search.results"  v-if="item.wrapperType === 'collection' ">
          <router-link v-bind:to="{ name: 'Album', params: { id: item.collectionId }}" >
            <div class="box has-text-centered">
              <img v-bind:src="item.artworkUrl100" alt="Jaquette d'album">
              <p>{{ item.collectionName }}</p>
            </div>
          </router-link>
        </div>
      </div>
      </div>
      <div v-if="this.type === 'artists/' || this.type === ''" >
      <div class="columns">
        <div class="column">
          <p class="title is-3 title-home">Artist</p>
          <hr>
        </div>
      </div>
      <div class="container-list">
        <div class="container-list">
          <div class="box-artist" v-for="item in search.results"  v-if="item.wrapperType === 'artist' ">
            <router-link v-bind:to="{ name: 'Artist', params: { id: item.artistId }}" >
              <div class="box has-text-centered">
                <p>{{ item.artistName }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      </div>
      <div v-if="this.type === 'users/'">
        <div class="columns">
          <div class="column">
            <p class="title is-3 title-home">User</p>
            <hr>
          </div>
        </div>
        <div class="container-list">
          <div class="container-list">
            <div class="box-artist" v-for="item in search">
                <div class="box">
                  <router-link v-bind:to="{ name: 'User', params: { id: item.id }}" >
                    {{ item.name }}
                  </router-link>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.type === 'tracks/' || this.type === ''" >
      <div class="columns">
        <div class="column">
          <p class="title is-3 title-home">Tracks</p>
          <hr>
        </div>
      </div>
      <table id="playlist" class="table is-narrow is-hoverable is-fullwidth">
        <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th></th>
          <th>Title</th>
          <th>Duration</th>
          <th>Artist</th>
        </tr>
        </thead>
        <tbody>
        <song v-for="(item, index) in search.results"  v-if="item.wrapperType === 'track' " :key="item.trackId" v-bind:songsearch="true" v-bind:song="item" v-bind:index="index"/>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '@/api';
  import song from '@/components/Song';

  export default {
    name: 'Search',
    props: {
    },
    components: {
      song
    },
    data() {
      return {
        type: this.$route.params.type,
        query: this.$route.query.q,
        loading: false,
        search: []
      };
    },
    methods: {
      async getData() {
        this.loading = false;
        let tmpSearch = [];
        if (this.type === 'global') {
          this.type = '';
        }
        tmpSearch = await api.searchGlobal(this.type, this.query);
        this.loading = true;
        this.search = tmpSearch;
      }
    },
    watch: {
      '$route.query.q': function query(q) {
        this.query = q;
        this.getData();
      },
      '$route.params.type': function type(q) {
        this.type = q;
        this.getData();
      }
    },
    async  mounted() {
      this.getData();
    }
  };
</script>

<style scoped>
  .box-album {
    vertical-align: top;
    display: inline-block;
    width: 250px;
    max-width: 100%;
  }
  .spinner {
    margin: 100px auto 0;
    width: 70px;
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #333;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
  }

</style>
