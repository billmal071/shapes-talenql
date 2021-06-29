import { loginActionType } from "./context/types"

export type LoginData = {
  username: string,
  password: string
}

export type LoginStateType = {
  isLoggedIn: boolean,
  user: { username: string, password: string } | {},
  error: null | string,
  loading: boolean,
  login: (loginData: LoginData) => void,
  logOut: () => void,
}

export type LoginActionType = LoginSuccess | LoginError | Logout | LoginLoading

export type LoginSuccess = {
  type: loginActionType.loginSuccess,
  payload: {
     username: string, password: string ,
  }
}

export type LoginError = {
  type: loginActionType.loginError,
  payload: string,
}

export type Logout = {
  type: loginActionType.logout,
}

export type LoginLoading = {
  type: loginActionType.loading,
  payload: true
}