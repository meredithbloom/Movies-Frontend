import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
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
import 'bootstrap-icons/font/bootstrap-icons.css'
import PopularShows from './components/popularShows'
import TopRatedShows from './components/topRatedShows'
import DailyShows from './components/dailyShows'
import HomePage from './pages/home'
import Comedy from './pages/comedy'
import UserProfile from './pages/userProfile'
import MoviesByGenre from './components/moviesByGenre'

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
  const [searchString, setSearchString] = useState('')
  const [popularShows, setPopularShows] = useState([])
  const [topRatedShows, setTopRatedShows] = useState([])
  const [dailyShows, setDailyShows] = useState([])
  const [search, setSearch] = useState([])

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

const handleSearch = (event) => {
  event.preventDefault()
  // setSearchString(event.target.value);
  axios({
    url: '/search/movie',
    method: 'get',
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: 'dad5072890b975c25ff2358e550e5138',
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
      api_key: 'dad5072890b975c25ff2358e550e5138',
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
      api_key: 'dad5072890b975c25ff2358e550e5138',
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
      api_key: 'dad5072890b975c25ff2358e550e5138',
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

}, [])


  return(
    <>
    <BrowserRouter>
      <div ClassName="content">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/comedy" element={<Comedy/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
      </div>

      </BrowserRouter>
    </>
  )
}

export default App;
