// import React, { useState } from 'react'
import axios from 'axios'
import swAlert from '@sweetalert/with-react'
import { useHistory, Redirect, Link } from 'react-router-dom'

export const Login = (props) => {

    const history = useHistory()




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

        axios.post('http://challenge-react.alkemy.org', { email, password })
            .then(res => {
                swAlert(<h2>Perfecto, ingresaste correctamente</h2>)
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                history.push('/listado')
            })
    }
    const token = sessionStorage.getItem('token')

    return (
        <>
            {token && <Redirect to="/listado" />}

            <div className='w-full h-screen flex justify-center items-center flex-col bg-movie'>
                <h2 className='absolute text-8xl font-mono top-1'>Movie App</h2>
                <div className=' h-3/4 w-2/4 flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl'>
                    <h1 className='text-8xl'>Login</h1>
                    <form onSubmit={submitHandler} className='flex flex-col w-1/4 h-2/4 justify-center items-center gap-4'>
                        <label htmlFor="" className='label'><span>Email:</span>
                            <input type="text" name='email' className='input' />
                        </label>
                        <label htmlFor="" className='label'><span>Contraseña:</span>
                            <input type="password" name='password' className='input' />
                        </label>
                        <button type='submit' className='button'>Ingresar</button>
                        <div className='hipervinculo'>
                            <Link to="/register" >Registrarse </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
