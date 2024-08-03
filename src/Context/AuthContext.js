import React, { createContext, useReducer, useEffect } from 'react';
import { loginUser, registerUser } from '../Utils/api';
import setAuthToken from '../Utils/setAuthToken';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token')
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

const decodeJWT = (token) => {
  try {
    if (!token) return null;

    const base64Url = token.split('.')[1];
    if (!base64Url) throw new Error("Invalid token");

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      const decoded = decodeJWT(token);
      console.log('decoded', decoded)
      if (decoded) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { isAuthenticated: true, user: decoded.name ?? decoded.email, token: token }
        });
        setAuthToken(token);
      }
    }
  }, []);

  const login = async (userData) => {
    try {
      const res = await loginUser(userData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      let newUser=user;
      if(user == null || user == undefined){
        const decoded = decodeJWT(token);
        newUser = decoded;
      }
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { isAuthenticated: true,user:newUser, token:token }
      });
      return { success: true, msg: "Login successful" };
    } catch (err) {
      console.error('Login error', err.response.data);
      return { success: false, msg: err.response.data.message };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await registerUser(userData);

      return res;
    } catch (err) {
      console.error('Register error', err.response.data);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
