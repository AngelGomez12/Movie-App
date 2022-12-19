import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import swAlert from '@sweetalert/with-react'
import { Link } from 'react-router-dom'
import { ReactComponent as FlechaIzquierda } from './../img/iconmonstr-angel-left-thin.svg'
import { ReactComponent as FlechaDerecha } from './../img/iconmonstr-angel-right-thin.svg'


export const SlideShow = () => {
    const slideShow = useRef(null)
    const intervalSlideShow = useRef(null)

    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        const endPoint = 'https://api.themoviedb.org/3/trending/all/day?api_key=55d82b057688b0bb5ac76394054eb64d'
        axios.get(endPoint)
            .then(res => {
                const apiData = res.data
                setMovieList(apiData.results);
            })
            .catch(error => {
                swAlert(<h2>Hubo errorres, intenta mas tarde</h2>)
            })
    }, [setMovieList]);

    const siguiente = () => {
        if (slideShow.current.children.length > 0) {

            const primerElemento = slideShow.current.children[0]

            slideShow.current.style.transition = `300ms ease-out all`

            const tamanoSlide = slideShow.current.children[0].offsetWidth

            slideShow.current.style.transform = `translateX(-${tamanoSlide}px)`

            const transicion = () => {
                slideShow.current.style.transition = 'none'
                slideShow.current.style.transform = `translateX(0)`

                slideShow.current.appendChild(primerElemento)

                slideShow.current.removeEventListener('transitionend', transicion)
            }

            slideShow.current.addEventListener('transitionend', transicion)
        }
    }

    const anterior = () => {
        if (slideShow.current.children && slideShow.current.children.length > 0) {

            const index = slideShow.current.children.length - 1
            const ultimoElemento = slideShow.current.children[index]

            slideShow.current.insertBefore(ultimoElemento, slideShow.current.firstChild)

            const tamanoSlide = slideShow.current.children[0].offsetWidth

            slideShow.current.style.transition = 'none'
            slideShow.current.style.transform = `translateX(-${tamanoSlide}px)`

            setTimeout(() => {
                slideShow.current.style.transition = '300ms ease-out all'
                slideShow.current.style.transform = `translateX(0)`
            }, 30)
        }
    }

    useEffect(() => {
        intervalSlideShow.current = setInterval(() => {
            siguiente()
        }, 5000);

        slideShow.current.addEventListener('mouseenter', () => {
            clearInterval(intervalSlideShow.current)
        })

        slideShow.current.addEventListener('mouseleave', () => {
            intervalSlideShow.current = setInterval(() => {
                siguiente()
            }, 5000);
        })
    }, [])

    return (
        <>
            <div className='flex flex-nowrap' ref={slideShow}>
                {
                    movieList.map((oneMovie, idx) => {
                        return (
                            <div className='flex flex-col justify-center items-center max-h-full min-w-full relative bg-blue-500' key={idx}>
                                <div className='flex flex-nowrap'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt="..." className='h-screen z-0' />
                                    <p className='mt-3 mb-5 font-light text-4xl absolute z-10 bottom-40 left-40 text-gray-200'> {oneMovie.overview.substring(0, 100)}... </p>
                                    <Link to={`/detalle?movieID=${oneMovie.id}`} className='bg-sky-900 mt-3 mb-5 p-2 text-white absolute z-10 bottom-56 left-40 h-10 w-40 text-center'>More details</Link>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
            <div className='flex place-content-between bottom-1/2 w-full absolute'>
                <button onClick={anterior}>
                    <FlechaIzquierda />
                </button>
                <button onClick={siguiente}>
                    <FlechaDerecha />
                </button>
            </div>
        </>
    )
}
