/* eslint-disable no-plusplus,no-unused-vars */

export const setTokenCookie = (token) => {
  document.cookie = `access_token=${token}`;
};

export const getToken = () => {
  const name = 'access_token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring((name).length, c.length);
    }
  }
  return '';
};

export const deleteTokenCookie = () => {
  document.cookie = 'access_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
