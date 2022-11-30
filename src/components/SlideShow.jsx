import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swAlert from '@sweetalert/with-react'
import { Link } from 'react-router-dom'
import { ReactComponent as FlechaIzquierda } from './../img/iconmonstr-angel-left-thin.svg'
import { ReactComponent as FlechaDerecha } from './../img/iconmonstr-angel-right-thin.svg'

export const SlideShow = () => {

    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/movie/popular?api_key=55d82b057688b0bb5ac76394054eb64d&language=en-US&page=1'
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data
                setMovieList(apiData.results);
            })
            .catch(error => {
                swAlert(<h2>Hubo errorres, intenta mas tarde</h2>)
            })
    }, [setMovieList]);

    return (
        <>
            <div className='flex flex-nowrap'>
                {
                    movieList.map((oneMovie, idx) => {
                        return (
                            <div className='flex flex-col justify-center items-center max-h-full min-w-full relative bg-blue-500' key={idx}>
                                <div>
                                    <div className='min-w-full'>
                                        <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="..." className='h-screen z-0' />
                                        {/* <h5 className='font-bold'> {oneMovie.title.substring(0, 50)} </h5> */}
                                        <p className='mt-3 mb-5 font-light text-base absolute z-10 bottom-40 text-gray-200'> {oneMovie.overview.substring(0, 100)}... </p>
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className='bg-sky-600 mt-3 mb-5 p-2 text-white absolute z-10 bottom-56'>More details</Link>
                                    </div>
                                </div>
                                <div className='flex space-x-96'>
                                    <button>
                                        <FlechaIzquierda />
                                    </button>
                                    <button>
                                        <FlechaDerecha />
                                    </button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}
