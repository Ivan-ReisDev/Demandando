import React from 'react'
import { Link } from 'react-router-dom'

// file css 
import style from '../About/About.module.css'

const About = () => {
  return (
    <div className={style.about}>
      <h2>Sobre o <span>Dê</span>Mandando</h2>
      <p>Este projeto consiste em um blog feito com React feito no front-end e Firebase no back-end.</p>
      <Link to='/post/create'>Criar Post</Link>
    </div>
  )
}

export default About