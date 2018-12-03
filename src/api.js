/* eslint-disable no-console */
import axios from 'axios';
import User from '@/models/User';


export const user = new User();
user.email = 'team-7';
user.password = 'team-7';
user.accessToken = '';


export const login = () => axios.post('https://ubeat.herokuapp.com/login/',
  {
    email: user.email,
    password: user.password,
  })
  .then((r) => {
    user.accessToken = r.data.token;
  })
  .catch((e) => {
    console.log(e);
  });

export const getTokenInfo = () =>
  axios.get('https://ubeat.herokuapp.com/tokeninfo', {
    headers: { Authorization: user.accessToken }
  })
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getPlaylist = id =>
  axios.get(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const createPlaylist = name =>
  axios.post(`https://ubeat.herokuapp.com/playlists/?access_token=${user.accessToken}`, {
    name
  })
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const updatePlaylist = (id, name) =>
  axios.put(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${user.accessToken}`, {
    name
  })
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });


export const addSongToPlaylist = (id, track) =>
  axios.post(`https://ubeat.herokuapp.com/playlists/${id}/tracks?access_token=${user.accessToken}`,
    track)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getAlbum = id =>
  axios.get(`https://ubeat.herokuapp.com/albums/${id}?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getAlbumsFromArtist = id =>
  axios.get(`https://ubeat.herokuapp.com/artists/${id}/albums?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getUser = id =>
  axios.get(`https://ubeat.herokuapp.com/users/${id}?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getArtist = id =>
  axios.get(`https://ubeat.herokuapp.com/artists/${id}?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getTracksFromAlbum = id =>
  axios.get(`https://ubeat.herokuapp.com/albums/${id}/tracks?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const getAllPlaylist = () =>
  axios.get(`https://ubeat.herokuapp.com/playlists/?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });

export const deletePlaylist = id =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });
export const deleteSongFromPlaylist = (id, idTrack) =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}/tracks/${idTrack}?access_token=${user.accessToken}`)
    .then(response => response.data)
    .catch((e) => {
      console.log(e.message);
    });
