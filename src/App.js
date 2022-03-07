import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
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
import MoviesByGenre from './components/moviesByGenre'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PopularShows from './components/popularShows'
import TopRatedShows from './components/topRatedShows'
import DailyShows from './components/dailyShows'
import MoviesByGenre from './components/moviesByGenre'

//links
import HomePage from './pages/home'
import Action from './pages/action'
import Adventure from './pages/adventure'
import Comedy from './pages/comedy'
import Documentary from './pages/documentary'
import Drama from './pages/drama'
import Family from './pages/family'
import Fantasy from './pages/fantasy'
import Horror from './pages/horror'
import Romance from './pages/romance'
import Thriller from './pages/thriller'
import UserProfile from './pages/userProfile'
import CreateAccount from './pages/createaccount'
import Login from './pages/login'

import AllMovies from './pages/all-movies'

const App = () => {
  const Navigate = useNavigate()
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
  const [currentUser, setCurrentUser] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    console.log('current user is named ', currentUser.name, ' and has username ', currentUser.username)
  } else {
    console.log('no one is logged in')
  }

  //creating a user - is passed as props to login form route
  const handleNewUser = (newUser) => {
    console.log(newUser);
    axios({
      method: 'post',
      url: '/users/createaccount',
      baseURL: 'https://powerful-garden-94854.herokuapp.com',
      data: newUser
    }).then((response) => {
      if (response.data) {
        axios({
          method: 'get',
          url: '/users/:id',
          baseURL: 'http://localhost:3003'
        })
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
    //console.log(currentUser)
  }

  const handleLogin = (userObj) => {
    console.log(userObj)
    axios({
      method: 'put',
      url: '/users/login',
      baseURL: 'http://localhost:3003',
      data: userObj
    }).then((response) => {
      if (response.data) {
        // console.log(response.data)
        setLoggedIn(true)
        setCurrentUser(response.data)
        Navigate('/profile')
      } else {
        setErrorMessage(response.data)
        setToggleError(response.data)
      }
    })
    //showCurrentUser()
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


  //how much of this do we even need in app? since home seems to be the root/closest common ancestor
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
      <Routes>

        <Route path="/" element={<HomePage/>}/>
        <Route path="/newaccount" element={<CreateAccount handleNewUser={handleNewUser}/>}/>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
        <Route path="/movies" element={<AllMovies currentUser={currentUser}/>}/>
        <Route path="/action" element={<Action currentUser={currentUser}/>}/>
        <Route path="/adventure" element={<Adventure currentUser={currentUser}/>}/>
        <Route path="/comedy" element={<Comedy currentUser={currentUser}/>}/>
        <Route path="/documentary" element={<Documentary currentUser={currentUser}/>}/>
        <Route path="/drama" element={<Drama currentUser={currentUser}/>}/>
        <Route path="/family" element={<Family currentUser={currentUser}/>}/>
        <Route path="/fantasy" element={<Fantasy currentUser={currentUser}/>}/>
        <Route path="/horror" element={<Horror currentUser={currentUser}/>}/>
        <Route path="/romance" element={<Romance currentUser={currentUser}/>}/>
        <Route path="/thriller" element={<Thriller currentUser={currentUser}/>}/>

        <Route path="/profile" element={<UserProfile currentUser={currentUser}/>}/>
      </Routes>
    </>
  )
}

export default App;
