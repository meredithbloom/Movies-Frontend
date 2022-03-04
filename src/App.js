import {useState, useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
// import bootstrap from 'bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import './App.css'
import TrendingMovies from './components/trendingmovies'
import UpcomingMovies from './components/upcoming'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieType from './components/headingTitle'
import TopRated from './components/topRated'
import PopularMovies from './components/popular'

const App = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState([])
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [searchString, setSearchString] = useState('search')


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

const getTopRated = () => {
  axios({
    url: '/movie/top_rated',
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'dad5072890b975c25ff2358e550e5138',
      language: 'en-US'
    }
  }).then((response) => {
    setTopRated(response.data.results)
  })
};

const getPopular = () => {
  axios({
    url: '/movie/popular',
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'dad5072890b975c25ff2358e550e5138',
      language: 'en-US'
    }
  }).then((response) => {
    setPopularMovies(response.data.results)
  })
};

const searchMovies = (event) => {
  axios({
    url: '/search/movie',
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'dad5072890b975c25ff2358e550e5138',
      language: 'en-US',
      query: searchString
    }
  })
}
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
const setMenuOpacity = (event) => {
  if (opacity == 1) {
    setOpacity(0)
    setzIndex(0)
  }else if(opacity == 0){
    setOpacity(1)
    setzIndex(2)
  }
}


useEffect(() => {
  getTrendingMovies()
  getUpcomingMovies()
  getTopRated()
  getPopular()
  searchMovies()
}, [])


  return(
    <>

    <header>
    <div>
      <img className='logo' src='/SeenLogo.png' />
    </div>
      <div className='head-button-container'>
        <button className="signup">Sign Up</button>
        <button className="login">Log In</button>
        <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        </div>
      </header>
      <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
      <input onChange={(event) => setSearchString(event.target.value)} className='search-box' type='text' name='search' value={searchString}/>
      <h2>Search By Genre</h2>
        <a href="#">Comedy</a>
        <a href="#">Horror</a>
        <a href="#">Romance</a>
        <a href="#">Family</a>
        <a href="#">Action</a>
        <a href="#">Drama</a>
        <a href="#">Adventure</a>
        <a href="#">Documentary</a>
        <a href="#">Fantasy</a>
        <a href="#">Thriller</a>
      </div>
      <div className='start-image'>
        <h3>Spider-Man</h3>
        <p>No Way Home</p>
        <svg xmlns="http://www.w3.org/2000/svg"  className="yellow" width="26" height="26" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="yellow" width="26" height="26" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="yellow" width="26" height="26" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="yellow" width="26" height="26" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" className="yellow" width="26" height="26" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
        </svg>
      </div>
      <div className="row mt-4 mb-4">
        <MovieType heading='Trending Movies'/>
      </div>
      <div className="container-fluid movies">
        <div className="row">
          <TrendingMovies trendingMovies={trendingMovies}/>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <MovieType heading='Upcoming Movies'/>
      </div>
      <div className="container-fluid movies">
        <div className="row">
          <UpcomingMovies upcomingMovies={upcomingMovies}/>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <MovieType heading='Top Rated'/>
      </div>
      <div className="container-fluid movies">
        <div className="row">
          <TopRated topRated={topRated}/>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <MovieType heading='Popular'/>
      </div>
      <div className="container-fluid movies">
        <div className="row">
          <PopularMovies popularMovies={popularMovies}/>
        </div>
      </div>
    </>
  )
}

export default App;
