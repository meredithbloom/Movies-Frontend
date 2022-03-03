import {useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import TrendingMovies from './components/trendingmovies'
import UpcomingMovies from './components/upcoming'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieType from './components/headingTitle'

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])
  const [image, setImage] = useState([])
  const [pageNum, setPageNum] = useState([])




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
};

const getUpcomingMovies = () => {
  axios({
    url: '/movie/upcoming',
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'dad5072890b975c25ff2358e550e5138',
      language: 'en-US',
      region: 'US'
    }
  }).then((response) => {
    setUpcomingMovies(response.data.results)
  })
};

// const Home = () => {
//   return(
//     <>
//       <main>
//         <h2>Welcome to the movie database</h2>
//         <p>We can do it!!!</p>
//       </main>
//       <nav>
//         <Link to="/about">About</Link>
//       </nav>
//     </>
//   )
// }


// const About = () => {
//   return (
//     <>
//       <main>
//         <h2>We are Heather and Meredith</h2>
//       </main>
//       <nav>
//         <Link to="/">Home</Link>
//       </nav>
//     </>
//   )
// }

useEffect(() => {
  getTrendingMovies() 
  getUpcomingMovies()
}, [])




  return(
    <>
    <header>
      <h2 className="title">Cinema Wave</h2>
      <div className='head-button-container'>
        <button className="signup">Sign Up</button>
        <button className="login">Log In</button>
        </div>
      </header>
      <div className="row mt-4 mb-4">
        <MovieType heading='Trending Movies'/>
      </div>
      <div className="container-fluid trending-movies">
        <div className="row">
          <TrendingMovies trendingMovies={trendingMovies}/>
        </div>
      </div>
      <h1>Upcoming Movies</h1>
      <div className="upcoming-movies-div">
        <UpcomingMovies upcomingMovies={upcomingMovies}/>
      </div>
    </>
  )
}

export default App;
