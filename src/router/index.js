import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Album from '@/components/Album';
import Artist from '@/components/Artist';
import Playlists from '@/components/Playlists';
import Playlist from '@/components/Playlist';
import User from '@/components/User';
import Search from '@/components/Search';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { auth: true }
    }, {
      path: '/artist/:id',
      name: 'Artist',
      component: Artist,
      props: true,
      meta: { auth: true }
    }, {
      path: '/album/:id',
      name: 'Album',
      component: Album,
      props: true,
      meta: { auth: true }

    }, {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists,
      meta: { auth: true }

    }, {
      path: '/playlists/:id',
      name: 'Playlist',
      component: Playlist,
      props: true,
      meta: { auth: true }

    }, {
      path: '/user/:id',
      name: 'User',
      component: User,
      props: true,
      meta: { auth: true }

    },
    {
      path: '/search/:type',
      name: 'Search',
      component: Search,
      props: true,
      meta: { auth: true }

    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
      meta: { auth: false }
    },
  ]
});
