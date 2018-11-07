import axios from 'axios';

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YmUyMjQzNzNlZmJkYTAwMDQ0ZWYzNzUiLCJleHAiOjE1NDE2MzM0OTMyMTV9.A6lExdYfZY8eSDGQ2Na3A2ZOa7xprgN_4PsEf-Npino';

export const login = () =>
  axios.get('https://ubeat.herokuapp.com/playlists/')
    .then(response => response.data)
    .catch(() => {
    });


export const getUser = () =>
  axios.get('https://ubeat.herokuapp.com/tokeninfo', {
    headers: { Authorization: accessToken }
  })
    .then(response => response.data)
    .catch(() => {
    });

export const getTokenInfo = () =>
  axios.get('https://ubeat.herokuapp.com/tokeninfo', {
    headers: { Authorization: accessToken }
  })
    .then(response => response.data)
    .catch(() => {
    });

export const getPlaylist = id =>
  axios.get(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${accessToken}`)
    .then(response => response.data)
    .catch(() => {
    });

export const createPlaylist = name =>
  axios.post(`https://ubeat.herokuapp.com/playlists/?access_token=${accessToken}`, {
    name
  })
    .then(response => response.data)
    .catch(() => {
    });

export const updatePlaylist = (id, name) =>
  axios.put(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${accessToken}`, {
    name
  })
    .then(response => response.data)
    .catch(() => {
    });


export const getAllPlaylist = () =>
  axios.get(`https://ubeat.herokuapp.com/playlists/?access_token=${accessToken}`)
    .then(response => response.data)
    .catch(() => {
    });

export const deletePlaylist = id =>
  axios.delete(`https://ubeat.herokuapp.com/playlists/${id}?access_token=${accessToken}`)
    .then(response => response.data)
    .catch(() => {
    });
