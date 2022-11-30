import React from 'react'
import { Link } from 'react-router-dom'
import { Buscador } from './Buscador'

export const Header = () => {
  return (
    <header className='sticky top-0 z-10'>
        <nav className='flex bg-black h-16 text-white justify-center items-center'>
            <ul className='w-11/12 h-10 flex items-center justify-evenly'>
                <li>
                    <Link to="/" className='link'>Home</Link>
                </li>
                <li>
                     <Link to="/listado" className='link'>Listado</Link>
                </li>
                <li>
                     <Link to="/contacto" className='link'>Contacto</Link>
                </li>
            </ul>
            <Buscador />
        </nav>
    </header>
  )
}
