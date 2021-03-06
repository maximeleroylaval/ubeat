/* eslint-disable no-console */
import axios from 'axios';
import User from '@/models/User';
import * as cookie from '@/cookie';

export const user = new User();

export const login = () => axios.post('https://ubeat.herokuapp.com/login/',
  {
    email: user.email,
    password: user.password,
  });

export const register = (_name, _email, _password) => axios.post('https://ubeat.herokuapp.com/signup/',
  {
    name: _name,
    email: _email,
    password: _password,
  });

export const getTokenInfo = () => axios.get('https://ubeat.herokuapp.com/tokeninfo', {
  headers: { Authorization: cookie.getToken() }
})
    .then(response => response.data)
    .catch(() => false);

export const getPlaylist = id =>
  axios.get(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const createPlaylist = name =>
  axios.post(`https://ubeat.herokuapp.com/playlists/?access_token=${cookie.getToken()}`, {
    name
  })
    .then(response => response.data)
    .catch(() => false);

export const updatePlaylist = (id, name) =>
  axios.put(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${cookie.getToken()}`, {
    name
  })
    .then(response => response.data)
    .catch(() => false);


export const addSongToPlaylist = (id, track) =>
  axios.post(`https://ubeat.herokuapp.com/playlists/${id}/tracks?access_token=${cookie.getToken()}`,
    track)
    .then(response => response.data)
    .catch(() => false);

export const getAlbum = id =>
  axios.get(`https://ubeat.herokuapp.com/albums/${id}?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const getAlbumsFromArtist = id =>
  axios.get(`https://ubeat.herokuapp.com/artists/${id}/albums?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const getUser = id =>
  axios.get(`https://ubeat.herokuapp.com/users/${id}?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const followUser = (idUser, callback) =>
  axios.post(`https://ubeat.herokuapp.com/follow?access_token=${cookie.getToken()}`, {
    id: idUser,
  })
    .then((response) => {
      callback(response.data);
    })
    .catch(() => false);

export const unfollowUser = (id, callback) =>
  axios.delete(`https://ubeat.herokuapp.com/follow/${id}?access_token=${cookie.getToken()}`)
    .then((response) => {
      callback(response.data);
    })
    .catch(() => false);

export const getArtist = id =>
  axios.get(`https://ubeat.herokuapp.com/artists/${id}?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);


export const searchGlobalLimit = (type, query) =>
  axios.get(`https://ubeat.herokuapp.com/search/${type}?q=${query}&access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const searchGlobal = (type, query) =>
  axios.get(`https://ubeat.herokuapp.com/search/${type}?q=${query}&limit=50&access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const getTracksFromAlbum = id =>
  axios.get(`https://ubeat.herokuapp.com/albums/${id}/tracks?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const getAllPlaylist = () =>
  axios.get(`https://ubeat.herokuapp.com/playlists/?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);

export const deletePlaylist = id =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);
export const deleteSongFromPlaylist = (id, idTrack) =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}/tracks/${idTrack}?access_token=${cookie.getToken()}`)
    .then(response => response.data)
    .catch(() => false);
export const scrapArtistPicture = (url, size) =>
  axios.get(url)
    .then((html) => {
      const doc = new DOMParser().parseFromString(html.data, 'text/html');
      const x = doc.querySelector('meta[property="og:image"]').getAttribute('content');
      const image = x.substring(0, x.lastIndexOf('/') + 1);
      return `${image}${size}.jpg`;
    })
    /* eslint-disable */
    .catch((e) => 'https://static.thenounproject.com/png/630729-200.png');
/* eslint-enable */
