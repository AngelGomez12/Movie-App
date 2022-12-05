
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import swAlert from '@sweetalert/with-react'
import { SlideShow } from './SlideShow';

export const Resultados = (props) => {
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword');

    const [movieResults, setMovieResults] = useState([]);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=55d82b057688b0bb5ac76394054eb64d&language=es-US&query=${keyword}`
        axios.get(endPoint).then(res => {
            const moviesArray = res.data.results;
            if (moviesArray.length === 0) {
                swAlert(<h4>Tu busqueda no arrojo resultados</h4>)
            }
            setMovieResults(moviesArray);
        })
            .catch(error => { console.log(error); })
    }, [keyword]);

    return (
        <>
            <SlideShow />
            <h2 className='text-center text-xl'>Buscaste: {keyword}</h2>
            {movieResults.length === 0 && <div className='h-screen font-bold text-4xl'><h3 className='text-center'>No hay resultados</h3></div>}

            <div className='grid grid-cols-4 gap-4 content-center p-10 items-start'>

                {
                    movieResults.map((oneMovie, idx) => {
                        return (
                            <div className='flex flex-col m-5 justify-center max-h-full' key={idx}>
                                <div className=' border-2 p-3 h-50 pb-5 relative'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="..." />
                                        <button className='absolute right-3 top-3 outline-none text-4xl'
                                            onClick={props.addOrRemoveFromFavs}
                                            data-movie-id={oneMovie.id}
                                        >🖤</button>
                                    <div>
                                        <h5 className='font-bold'> {oneMovie.title.substring(0, 50)} </h5>
                                        <p className='mt-3 mb-5 font-light text-base'> {oneMovie.overview.substring(0, 100)}... </p>
                                        <Link to={`/detalle?movieID=${oneMovie.id}`} className='bg-sky-600 mt-3 mb-5 p-2 text-white'>More details</Link>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

            </div>
        </>
    )
}