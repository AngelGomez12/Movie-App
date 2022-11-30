import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export const Detalle = () => {
  let token = sessionStorage.getItem('token');

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get('movieID');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=55d82b057688b0bb5ac76394054eb64d&language=es-US`;

   axios.get(endPoint).then(res => {
    const movieData = res.data
    setMovie(movieData);
    })
  .catch(error => {
    console.log(error);
  })
  },[movieID]);

  return (
    <>
      { !token && <Redirect to="/" /> }
      { !movie && <p>Cargando...</p> }
      { movie && 
      <div className='h-screen'>
        <h2 className='font-bold text-2xl text-center'>Titulo: {movie.original_title}</h2>
        <div className='flex flex-col'>
             <div className='flex p-3 h-50 pb-5 justify-center'>
                 <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster" />
             </div>
            <div>
              <h5>Fecha de estreno: {movie.release_date} </h5>
              <h5>Reseña: {movie.overview}</h5>
              <h5>Raiting: {movie.vote_average}</h5>
              <h5>Generos:</h5>
              <ul>
                {movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
              </ul>
            </div>
        </div>
      </div>
      }
    </>
  )
}
