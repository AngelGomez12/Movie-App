import React from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'


export const Formulario = () => {

  let initialValue = {
    name: '',
    apellido: '',
    email: '',
    password: ''
  }
  const onSubmit = e => {
    e.preventDefault()
    console.log(e);
  }

  const formik = useFormik({
    initialValue,
    onSubmit
  })
  return (
    <div className='flex flex-col justify-start items-center m-12 h-3/4 w-2/4 bg-white rounded-lg shadow-2xl text-center'>
      <div className='m-12'>
        <h1 className='text-8xl p-12'>Registrarse</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className='flex flex-col items-center mt-12 gap-9 w-1/4 h-2/4'>
        <label htmlFor="" className='label'><span className='span'>Nombre:</span>
          <input onChange={ formik.handleChange} type="text" name='name' placeholder='Nombre' className='input' />
        </label>
        <label htmlFor="" className='label'><span className='span'>Apellido:</span>
          <input onChange={ formik.handleChange} type="text" name='apellido' placeholder='Apellido' className='input' />
        </label>
        <label htmlFor="" className='label'><span className='span'>Email:</span>
          <input onChange={ formik.handleChange} type="email" name='email' placeholder='Email' className='input' />
        </label>
        <label htmlFor="" className='label'><span className='span'>Contraseña:</span>
          <input onChange={ formik.handleChange}type="password" name='password' placeholder='Password' className='input' />
        </label>
        <button type='submit' className='button w-1/2'>Registrar</button>
        <Link to='/login' className='hipervinculo'>Ya estoy registrado</Link>
      </form>
    </div>
  )
}