import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
// import bootstrap from 'bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import TrendingMovies from '../components/trendingmovies'
import UpcomingMovies from '../components/upcoming'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieType from '../components/headingTitle'
import TopRated from '../components/topRated'
import PopularMovies from '../components/popular'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PopularShows from '../components/popularShows'
import TopRatedShows from '../components/topRatedShows'
import DailyShows from '../components/dailyShows'
import Search from '../components/search'
import GenreNavBar from '../components/genreNavMenu'



const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [popularShows, setPopularShows] = useState([])
  const [topRatedShows, setTopRatedShows] = useState([])
  const [dailyShows, setDailyShows] = useState([])
  const [search, setSearch] = useState([])



  //user authentication
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleError, setToggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleLogout, setToggleLogout] = useState(false)
  const [currentUser, setCurrentUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  //creating a user - is passed as props to login form route
  const handleNewUser = (newUser) => {
    axios({
      method: 'post',
      url: '/users/createaccount',
      baseURL: 'http://localhost:3003',
      data: newUser 
    }).then((response) => {
      if (response.data.username) {
        console.log(response)
        setToggleError(false)
        setErrorMessage('')
        setCurrentUser(response.data)
        setLoggedIn(true)
      } else {
        setErrorMessage(response.data)
        setToggleError(true)
      }
    })
  }

  const handleLogin = (userObj) => {
    console.log(userObj)
    axios({
      method: 'put',
      url: '/users/login',
      baseURL: 'http://localhost:3003',
      data: userObj
    }).then((response) => {
      if (response.data.username) {
        console.log(response)
        setCurrentUser(response.data)
        setLoggedIn(true)  
      } else {
        setErrorMessage(response.data)
        setToggleError(response.data)
      }
    })
  }

  //logout - returns user state to default
  const handleLogout = () => {
    setCurrentUser({})
    handleToggleLogout()
  }
  
  //for conditional rendering of login form/buttons up top
  const handleToggleForm = () => {
    setToggleError(false)
    if (toggleLogin === true) {
      setToggleLogin(false)
    } else {
      setToggleLogout(true)
    }
  }

    //conditional rendering
  const handleToggleLogout = () => {
    if (toggleLogout) {
      setToggleLogout(false)
    } else {
      setToggleLogout(true)
    }
  }

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
        api_key: process.env.REACT_APP_TMDB_KEY
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
        api_key: process.env.REACT_APP_TMDB_KEY,
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
        api_key: process.env.REACT_APP_TMDB_KEY,
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
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US'
      }
    }).then((response) => {
      setPopularMovies(response.data.results)
    })
  };

  const handleSearch = (event) => {
    event.preventDefault()
    // setSearchString(event.target.value);
    axios({
      url: '/search/movie',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US',
        query: searchString
      }
    }).then((response) => {
      setSearch(response.data.results)
    })}

  const getPopularShows = () => {
    axios({
      url: '/tv/popular',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US'
      }
    }).then((response) => {
      setPopularShows(response.data.results)
    })
  };
  const getTopRatedShows = () => {
    axios({
      url: '/tv/top_rated',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US'
      }
    }).then((response) => {
      setTopRatedShows(response.data.results)
    })
  };
  const getDailyShows = () => {
    axios({
      url: '/tv/airing_today',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US'
      }
    }).then((response) => {
      setDailyShows(response.data.results)
    })
  };
  //event handler for genre buttons
  const setGenreHandler = (event, index) => {
    let selectedGenre = allGenres[index]
    setGenre(selectedGenre)
    searchByGenre()
  }

  //searches database by genre id, sets movies sorted by genre
  const searchByGenre = () => {
    axios({
      url: '/discover/movie',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US',
        with_genres: genre.id
    }}).then((response) => {
      setMoviesByGenre(response.data.results)
      //console.log(moviesByGenre)
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
    getPopularShows()
    getTopRatedShows()
    getDailyShows()
    searchByGenre()

  }, [])


  return(
    <>

    <header>
    <div>
      <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
    </div>
      <div className='head-button-container d-flex align-items-end'>
      <Link to="/newaccount"><button className="signup">Sign Up</button></Link>
      <Link to="/login"><button className="login">Log In</button></Link>
        <Link to="/profile"><i class="bi bi-person user"></i></Link>
        <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        </div>
      </header>
      <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
      <Link to="/movies">All Movies</Link>
      <form onSubmit={handleSearch}>
      <input onChange={event => setSearchString(event.target.value)} className='search-box'value={searchString} placeholder='Search for a movie..'/>
      <input type="submit" value="search" id="submit-button"/>
      </form>
      <h2>Search By Genre</h2>
        <Link to="/action">Action</Link>
        <Link to="/adventure">Adventure</Link>
        <Link to="/comedy">Comedy</Link>
        <Link to="/documentary">Documentary</Link>
        <Link to="/drama">Drama</Link>
        <Link to="/family">Family</Link>
        <Link to="/fantasy">Fantasy</Link>
        <Link to="/horror">Horror</Link>
        <Link to="/romance">Romance</Link>
        <Link to="/thriller">Thriller</Link>
      </div>
    <div className='start-image'>
      <h3>Spider-Man</h3>
      <p>No Way Home</p>
      <div className="stars">
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-fill yellow "></i>
        <i class="bi bi-star-half yellow "></i>
      </div>
    </div>
    <div className="movie-section">
    <div className="row mt-4 mb-4">
      <MovieType heading={searchString}/>
      </div>
      <div className="container-fluid movies">
        <div className="row">
          <Search search={search}/>
        </div>
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
      <MovieType heading='Top Rated Movies'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <TopRated topRated={topRated}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Popular Movies'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <PopularMovies popularMovies={popularMovies}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Popular Shows'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <PopularShows popularShows={popularShows}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Top Rated Shows'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <TopRatedShows topRatedShows={topRatedShows}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Shows Airing Today'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <DailyShows dailyShows={dailyShows}/>
      </div>
    </div>
    </div>
    </>

  )
}

export default HomePage
