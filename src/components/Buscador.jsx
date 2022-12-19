import React from 'react'
import swAlert from '@sweetalert/with-react'
import { useHistory } from 'react-router-dom'
export const Buscador = () => {
    const history = useHistory();
    const submitHandler = e => {
        e.preventDefault();

        const keyword = e.currentTarget.keyword.value.trim();

        if (keyword.length === 0) {
            swAlert(<h4>Tienes que escribir una pelicula</h4>)
        } else if (keyword.length < 4) {
            swAlert(<h5>Tienes que escribir mas de 4 caracteres</h5>)
        } else {
            e.currentTarget.keyword.value = ''
            history.push(`/resultados?keyword=${keyword}`)
        }
    }
    return (
        <div className='flex items-center'>
            <form onSubmit={submitHandler} className='flex h-4/5 w-4/5 font-bold justify-center items-center text-black'>
                <label htmlFor="" className='flex'>
                    <input type="text" name='keyword' className='border-2' placeholder='Buscar...' />
                </label>
                <button type='submit' className='bg-teal-700 p-1 text-white'>Buscar</button>
            </form>
        </div>
    )
}
