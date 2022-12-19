import './App.css'
import { useState, useEffect } from 'react';
import { Login } from "./components/Login";
import { Route, Switch } from "react-router-dom";
import { Listado } from "./components/Listado";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Detalle } from './components/Detalle';
import { Resultados } from './components/Resultados';
import { Favoritos } from './components/Favoritos';


function App() {
  let token = sessionStorage.getItem('token')
  const [favorites, setFavorites] = useState([])
  const [login, setLogin] = useState()

  const loginEnter = () => {
  let token = sessionStorage.getItem('token')
  setLogin(token)
    console.log(token);
  }
  
  // useEffect(() => {
  //   if (token) {
  //     setLogin(token)
  //   }
  // }, [token])

  useEffect(() => {
    const favsInLocal = localStorage.getItem('favs')

    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal)
      setFavorites(favsArray);
    }
  }, [])

  const favMovies = localStorage.getItem('favs')

  let tempMoviesInFavs;

  if (favMovies === null) {
    tempMoviesInFavs = []
  } else {
    tempMoviesInFavs = JSON.parse(favMovies)
  }

  const addOrRemoveFromFavs = e => {
    const btn = e.currentTarget
    const parent = btn.parentElement
    const imgURL = parent.querySelector('img').getAttribute('src')
    const title = parent.querySelector('h5').innerText
    const overview = parent.querySelector('p').innerText
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId
    }
    let movieIsInArry = tempMoviesInFavs.find(oneMovie => {
      return oneMovie.id === movieData.id
    })


    if (!movieIsInArry) {
      tempMoviesInFavs.push(movieData)
      localStorage.setItem('favs', JSON.stringify(tempMoviesInFavs))
      setFavorites(tempMoviesInFavs)
    } else {
      let moviesLeft = tempMoviesInFavs.filter(oneMovie => oneMovie.id !== movieData.id)
      setFavorites(moviesLeft)
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
    }

  }
  return (
    <div className='overflow-hidden'>
      <Header favorites={favorites} login={login}/>
      <Switch>
        <Route exact path="/" render={() => <Login onClick={loginEnter} />} />
        <Route path="/listado" render={(props) => <Listado addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} />} />
        <Route path="/detalle" component={Detalle} />
        <Route path="/resultados" render={(props) => <Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} />} />
        <Route path="/favoritos" render={(props) => <Favoritos favorites={favorites} addOrRemoveFromFavs={addOrRemoveFromFavs} {...props} />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
