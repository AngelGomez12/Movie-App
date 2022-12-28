
import { Link } from 'react-router-dom'
import { Buscador } from './Buscador'

export const Header = (props) => {

  const token = sessionStorage.getItem('token')

  return (
    <>
    { token &&
    <header className='fixed z-50 w-full'>
      <nav className='flex bg-black h-16 text-white justify-center items-center'>
        <ul className='w-11/12 h-10 flex items-center justify-evenly'>
          <li>
            <Link to="/" className='link'>Home</Link>
          </li>
          <li>
            <Link to="/favoritos" className='link'>Favoritos</Link>
          </li>
          <li>
            <Link to="/contacto" className='link'>Contacto</Link>
          </li>
          <li>
            <span>
              {props.favorites.length > 0 && <>Peliculas en Favoritos: {props.favorites.length}</>}
            </span>
          </li>
        </ul>
        <Buscador />
      </nav>
    </header>
    }
    </>
  )
}
