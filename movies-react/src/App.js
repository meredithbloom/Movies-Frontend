import {useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import TrendingMovies from './components/trendingmovies'

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])


const getTrendingMovies = () => {
  axios({
    url: '/trending/movie/week',
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'dad5072890b975c25ff2358e550e5138'
    }
  }).then((response) => {
    setTrendingMovies(response.data.results)
  })
}



const Home = () => {
  return(
    <>
      <main>
        <h2>Welcome to the movie database</h2>
        <p>We can do it!!!</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  )
}


const About = () => {
  return (
    <>
      <main>
        <h2>We are Heather and Meredith</h2>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  )
}

useEffect(() => {
  getTrendingMovies()
}, [])




  return(
    <>
      <h1>Trending Movies</h1>
      <div className="trending-movies-div">
        <TrendingMovies trendingMovies={trendingMovies}/>
      </div>
    </>
  )
}

export default App;