import React, { useState } from 'react'
import axios from 'axios'
import swAlert from '@sweetalert/with-react'
import { useHistory, Redirect} from 'react-router-dom'

export const Login = () => {

    const history = useHistory()
    // const [ isDisable, setDisabled ] = useState(false) 

    const submitHandler = e => {
        e.preventDefault()
        
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        
        
        
        if (email === '' || password === '') {
            swAlert(
                <h2>Los campos no pueden estar vacios</h2>
                )
                return
            }

        if (email !== '' && !regexEmail.test(email)) {
            swAlert(
                <h2>Debes escribir una direccion de correo electronico valida</h2>
            )
            return
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(
                <h2>Credenciales invalidas</h2>
            )
            return
        }

        axios.post('http://challenge-react.alkemy.org',{email, password})
        .then(res => {
            swAlert( <h2>Perfecto, ingresaste correctamente</h2> )
            const tokenRecibido = res.data.token;
            sessionStorage.setItem('token',tokenRecibido);
            history.push('/listado')
        })

    }
    
    let token = sessionStorage.getItem('token')
    
  return (
    <>
    { token && <Redirect to="/listado" /> }

    <div className='w-full h-screen flex justify-center items-center flex-col bg-gray-800'>
        <div className=' h-4/5 w-4/5 flex flex-col items-center justify-center bg-white'>
            <h2 className='font-bold text-2xl'>Formulario de login</h2>
            <form onSubmit={submitHandler} className='flex flex-col h-4/5 w-4/5 font-bold justify-center items-center'>
                <label htmlFor="" className='flex'><span>Correo Electronico:</span>
                    <input type="text" name='email' className='border-2'/>
                </label>
                <label htmlFor="">Contraseña:
                <input type="password" name='password' className='border-2'/>
                </label>
                <button type='submit'  className='bg-gray-800 p-3 text-white mt-4'>Ingresar</button>
            </form>
        </div>
    </div>
    </>
  )
}
