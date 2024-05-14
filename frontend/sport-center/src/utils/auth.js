export function getAuthToken() {

  let token;

  const localStorageToken = localStorage.getItem('accessToken');
  const sessionStorageToken = sessionStorage.getItem('accessToken');

  if (localStorageToken === null) {
    token = sessionStorageToken;
  } else {
    token = localStorageToken;
  }

  if (!token) {
    return null;
  }
  
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}