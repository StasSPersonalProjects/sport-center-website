import { createContext, useContext, useEffect, useState } from "react";
import { AUTH_URL, LOGOUT_URL } from "../utils/urls";
import { tokenLoader, validateToken } from "../utils/auth";

export const AuthContext = createContext({
  isAuthenticated: null,
  setIsAuthenticated: () => { },
  login: () => { },
  logout: () => { }
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = tokenLoader();
      if (token) {
        try {
          const isTokenValid = await validateToken(token);
          if (isTokenValid) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          switch (error.message) {
            case 'ForbiddenAccess':
              console.error('Forbidden access');
              break;
            case 'UnexpectedError':
              console.error('Unexpected error');
              break;
            default:
              console.error('Unknown error occurred:', error.message);
              break;
          }
        }
      }
    }

    checkToken();

  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const authData = {
        email: email,
        password: password
      }

      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
      });

      if (response.ok) {
        const resData = await response.json();
        const accessToken = resData.access_token;
        const refreshToken = resData.refresh_token;

        if (rememberMe) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
        }
        setIsAuthenticated(true);
      } else if (response.status === 403) {
        throw new Error('ForbiddenAccess');
      } else {
        throw new Error('UnexpectedError');
      }
    } catch (error) {
      throw new Error('LoginFailed');
    }
  }


  const logout = async () => {
    try {

      let accessToken = localStorage.getItem('accessToken');
      if (accessToken === null) {
        accessToken = sessionStorage.getItem('accessToken');
      }

      const response = await fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        },
      });

      if (response.ok) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const authValues = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}