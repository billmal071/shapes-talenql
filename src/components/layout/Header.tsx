import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import LoginContext from '../../context/login/loginContext'

function Header() {
  const { isLoggedIn, error, loading, login, user, logOut } = useContext(LoginContext);

  function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    logOut();
  }

  return (
    <header>
      <NavLink to="/" className="uppercase">shapes</NavLink>
      {isLoggedIn ?
        <>
          <button className="red-btn logout__btn" onClick={(e) => handleLogout(e)}>Logout<i className="fas fa-sign-out-alt ml__3px"></i></button>
        </> :
        <>
          <p>Logged out</p>
        </>
      }
    </header>
  )
}

export default Header
