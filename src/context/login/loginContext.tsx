import React, { createContext } from 'react';
import { LoginData, LoginStateType } from '../../defaultTypes';

export const loginState: LoginStateType = {
  isLoggedIn: false,
  user: {},
  error: null,
  loading: false,
  login: (loginData: LoginData) => null,
  logOut: () => null,
}
//const stored = localStorage.setItem("state", JSON.stringify(loginState));
const loginContext = createContext(loginState);

export default loginContext
