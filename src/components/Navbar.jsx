import React from 'react'

import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'
// react router dom
import { NavLink } from 'react-router-dom'

//file css

import style from './navbar.module.css'


const Navbar = () => {

  const { user } = useAuthValue();
  const { logout } = useAuthentication()

  return (
    <header className={style.header}>
      <NavLink to='/' className={style.logo}><span>Dê</span>Mandando</NavLink>
      <nav>
        <ul className={style.list}>
          <li><NavLink to='/' className={({ isActive }) => (isActive ? style.active : '')}>Home</NavLink></li>
          {!user &&
            <>
              <li><NavLink to='/login' className={({ isActive }) => (isActive ? style.active : '')}>Login</NavLink></li>
              <li><NavLink to='/register' className={({ isActive }) => (isActive ? style.active : '')}>Registre-se</NavLink></li>
            </>}

          {user &&
            <>
              <li><NavLink to='/post/create' className={({ isActive }) => (isActive ? style.active : '')}>Novo Post</NavLink></li>
              <li><NavLink to='/dashboard' className={({ isActive }) => (isActive ? style.active : '')}>Dashboard</NavLink></li>
            </>}
          <li><NavLink to='/about' className={({ isActive }) => (isActive ? style.active : '')}>Sobre</NavLink></li>
         {user && <li><button onClick={logout}>Sair</button></li>} 
        </ul>
      </nav>
    </header>
  )
}

export default Navbar