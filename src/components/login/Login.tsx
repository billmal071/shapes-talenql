import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";
import LoginContext from '../../context/login/loginContext';
import styles from "./login.module.scss";

function Login() {
  const history = useHistory();
  const [username, setUsername] = useState<string>("Test1");
  const [password, setPassword] = useState<string>("TalentQL");
  const { login, isLoggedIn } = useContext(LoginContext)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (username.trim() === "") {
      console.log("no username")
      await Swal.fire({
        icon: "error",
        text: "Enter a username"
      })
    }

    if (password.trim() === "") {
      console.log("no password")
      await Swal.fire({
        icon: "error",
        text: "Enter a password"
      })
    }

    if (username.match("Test1") && password.match("TalentQL")) {
      console.log(password);
      login({ username, password })
    } else {
      console.log("wrong credentials")
      await Swal.fire({
        icon: "error",
        text: "Wrong Credentials"
      })
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/")
    }
  }, [isLoggedIn])

  return (
    <div className={`${styles.h__90vh} ${styles.login}`}>
      <h4 className="uppercase center-text f__35 mt__30">login</h4>
      <form data-testid="loginForm" className={styles.login__body} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username" className={`${styles.login__text} capitalize`}>username</label>
          <input data-testid="username" type="text" name="username" id="username" className={`${styles.login__input}`} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="type username here..." required />
        </div>
        <div>
          <label htmlFor="password" className={`${styles.login__text} capitalize`}>password</label>
          <input data-testid="password" type="password" name="password" id="password" className={`${styles.login__input}`} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********" required />
        </div>
        <div className="center-text">
          <button data-testid="submit" type="submit" className={`${styles.login__btn} uppercase`}>login</button>
        </div>
      </form>
    </div>
  )
}

export default Login
