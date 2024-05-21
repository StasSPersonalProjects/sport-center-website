import { TOKEN_VALIDATION_URL } from "./urls";

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

export async function validateToken(token) {
  try {
    const response = await fetch(TOKEN_VALIDATION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });
  
    if (response.ok) {
      const resData = await response.json();
      return resData;
    } else if (response.status === 403) {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken');
      throw new Error('ForbiddenAccess');
    } else {
      sessionStorage.removeItem('accessToken');
      localStorage.removeItem('accessToken');
      throw new Error('UnexpectedError');
    }
  } catch (error) {
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('accessToken');
    throw new Error('AccessDenied');
  }

}