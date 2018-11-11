/* eslint-disable no-console */
import axios from 'axios';
import User from './models/User';

export const log = () =>
  axios.post('https://ubeat.herokuapp.com/login/',
    {
      email: 'team-7',
      password: 'team-7',
    })
    .then((response) => {
      User.accessToken = response.data.token;
    })
    .catch((e) => {
      console.log(e);
    });

export const login = () =>
  axios.get('https://ubeat.herokuapp.com/playlists/', {
    headers: { Authorization: User.accessToken }
  })
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        login();
      } else {
        console.log(e.message);
      }
    });

export const getUser = () =>
  axios.get('https://ubeat.herokuapp.com/tokeninfo', {
    headers: { Authorization: User.accessToken }
  })
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getUser();
      } else {
        console.log(e.message);
      }
    });

export const getTokenInfo = () =>
  axios.get('https://ubeat.herokuapp.com/tokeninfo', {
    headers: { Authorization: User.accessToken }
  })
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getTokenInfo();
      } else {
        console.log(e.message);
      }
    });

export const getPlaylist = id =>
  axios.get(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getPlaylist(id);
      } else {
        console.log(e.message);
      }
    });

export const createPlaylist = name =>
  axios.post(`https://ubeat.herokuapp.com/playlists/?access_token=${User.accessToken}`, {
    name
  })
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        createPlaylist(name);
      } else {
        console.log(e.message);
      }
    });

export const updatePlaylist = (id, name) =>
  axios.put(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${User.accessToken}`, {
    name
  })
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        updatePlaylist(id, name);
      } else {
        console.log(e.message);
      }
    });


export const addSongToPlaylist = (id, track) =>
  axios.post(`https://ubeat.herokuapp.com/playlists/${id}/tracks?access_token=${User.accessToken}`, {
    track
  })
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        addSongToPlaylist(id, track);
      } else {
        console.log(e.message);
      }
    });

export const getAlbum = id =>
  axios.get(`https://ubeat.herokuapp.com/albums/${id}?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getAlbum(id);
      } else {
        console.log(e.message);
      }
    });

export const getAlbumsFromArtist = id =>
  axios.get(`https://ubeat.herokuapp.com/artists/${id}/albums?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getAlbumsFromArtist(id);
      } else {
        console.log(e.message);
      }
    });

export const getArtist = id =>
  axios.get(`https://ubeat.herokuapp.com/artists/${id}?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getArtist(id);
      } else {
        console.log(e.message);
      }
    });

export const getTracksFromAlbum = id =>
  axios.get(`https://ubeat.herokuapp.com/albums/${id}/tracks?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getTracksFromAlbum(id);
      } else {
        console.log(e.message);
      }
    });

export const getAllPlaylist = () =>
  axios.get(`https://ubeat.herokuapp.com/playlists/?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        getAllPlaylist();
      } else {
        console.log(e.message);
      }
    });

export const deletePlaylist = id =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        deletePlaylist(id);
      } else {
        console.log(e.message);
      }
    });
export const deleteSongFromPlaylist = (id, idTrack) =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}/tracks/${idTrack}?access_token=${User.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      if (e.response.status === 401) {
        log();
        deleteSongFromPlaylist(id, idTrack);
      } else {
        console.log(e.message);
      }
    });
