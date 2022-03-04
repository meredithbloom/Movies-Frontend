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
import MoviesByGenre from './components/movieByGenre'
import 'bootstrap-icons/font/bootstrap-icons.css'

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

  //filtering by genre
  const allGenres =[
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 53,
      "name": "Thriller"
    }
  ]

  const [genre, setGenre] = useState({})
  const [moviesByGenre, setMoviesByGenre] = useState([])


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

  const setGenreHandler = (event, index) => {
    //console.log(index)
    let selectedGenre = allGenres[index]
    //console.log(selectedGenre.name)
    setGenre(selectedGenre)
    //console.log(genre.id)
    searchByGenre()
  }

  const searchByGenre = () => {
    axios({
      url: '/discover/movie',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: 'dad5072890b975c25ff2358e550e5138',
        language: 'en-US',
        with_genres: genre.id
    }}).then((response) => {
      console.log(response.data.results)
    })
  }


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
        <button onClick={(event) => { setGenreHandler(event, 0) }}><a href="#">Action</a></button>
        <button onClick={(event) => { setGenreHandler(event, 1) }}><a href="#">Adventure</a></button>
        <button onClick={(event) => { setGenreHandler(event, 2) }}><a href="#">Comedy</a></button>
        <button onClick={(event) => { setGenreHandler(event, 3) }}><a href="#">Documentary</a></button>
        <button onClick={(event) => { setGenreHandler(event, 4) }}><a href="#">Drama</a></button>
        <button onClick={(event) => { setGenreHandler(event, 5) }}><a href="#">Family</a></button>
        <button onClick={(event) => { setGenreHandler(event, 6) }}><a href="#">Fantasy</a></button>
        <button onClick={(event) => { setGenreHandler(event, 7) } }><a href="#">Horror</a></button>
        <button onClick={(event) => { setGenreHandler(event, 8) } }><a href="#">Romance</a></button>
        <button onClick={(event) => { setGenreHandler(event, 9) } }><a href="#">Thriller</a></button>
      </div>
      <div className='start-image'>
        <h3>Spider-Man</h3>
        <p>No Way Home</p>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-half yellow "></i>
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
      <div className="row mt-4 mb-4">
        <MovieType heading='By Genre'/>
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
