import React, { useEffect, useReducer } from 'react'
import { loginState } from './loginContext'
import LoginReducer, { initializer } from './loginReducer'
import LoginContext from './loginContext';
import { loginActionType } from '../types';
import { LoginData } from '../../defaultTypes';

export type Props = {
  children: React.ReactNode
}

function LoginState({ children }: Props) {
  const [state, dispatch] = useReducer(LoginReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem("shapeState", JSON.stringify(state))
  }, [state])

  function login(loginData: LoginData) {
    setLoading();

    try {
      dispatch({
        type: loginActionType.loginSuccess,
        payload: loginData
      })
    } catch (err) {
      dispatch({
        type: loginActionType.loginError,
        payload: "An error occurred, try again"
      })
    }
  }

  function setLoading() {
    dispatch({
      type: loginActionType.loading,
      payload: true
    })
  }

  function logOut() {
    dispatch({
      type: loginActionType.logout,
    })
  }

  return (
    <LoginContext.Provider value={{
      isLoggedIn: state.isLoggedIn,
      user: state.user,
      error: state.error,
      loading: state.loading,
      login,
      logOut
    }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginState
