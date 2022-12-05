import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swAlert from '@sweetalert/with-react'
import { SlideShow } from './SlideShow'


export const Listado = (props) => {
  let token = sessionStorage.getItem('token')
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=55d82b057688b0bb5ac76394054eb64d&language=es-US&page=1'
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
      <SlideShow />
      {!token && <Redirect to="/" />}

      <div className='grid grid-cols-4 gap-4 content-center p-10 items-start'>
        {
          movieList.map((oneMovie, idx) => {
            return (
              <div className='flex flex-col m-5 justify-center max-h-full' key={idx}>
                <div className=' border-2 p-3 h-50 pb-5 relative z-0'>
                  <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="..." />
                  <button className=' absolute right-3 top-3 text-4xl'
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
