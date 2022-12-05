import { Link, Redirect } from 'react-router-dom'

export const Favoritos = (props) => {
  let token = sessionStorage.getItem('token')
  
    return (
        <>
            {!token && <Redirect to="/" />}
            <h1 className="text-center font-bold text-4xl">Mis Favoritos</h1>
            <div className='grid grid-cols-4 gap-4 content-center p-10 items-start'>
                {!props.favorites.length && <div className="">No tenes nada en favoritos</div>}
                {
                    props.favorites.map((oneMovie, idx) => {
                        return (
                            <div className='flex flex-col m-5 justify-center max-h-full' key={idx}>
                                <div className=' border-2 p-3 h-50 pb-5 relative z-0'>
                                    <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.imgURL}`} alt="..." />
                                    <button className=' rounded-full absolute right-3 top-3 outline-none text-4xl text-center'
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