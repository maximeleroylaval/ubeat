import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Playlists from '@/components/Playlists';
import Playlist from '@/components/Playlist';
import User from '@/components/User';
import Search from '@/components/Search';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/artist/:id',
      name: 'Artist',
      component: Artist,
      props: true
    }, {
      path: '/album/:id',
      name: 'Album',
      component: Album,
      props: true
    }, {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists
    }, {
      path: '/playlists/:id',
      name: 'Playlist',
      component: Playlist,
      props: true
    }, {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true
    },
    {
      path: '/search/:type',
      name: 'Search',
      component: Search,
      props: true
    }
  ]
});
