import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import MovieType from '../components/headingTitle'
import DailyShows from '../components/dailyShows'
import TrendingMovies from '../components/trendingmovies'
import GenreNavBar from '../components/genreNavMenu'
import axios from 'axios'

const UserProfile = (props) => {
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [watchList, setWatchList] = useState([])
  const [user, setUser] = useState({})
  const [search, setSearch] = useState([])
  const [searchString, setSearchString] = useState('')
  const [currentUserInfo, setCurrentUserInfo] = useState({})
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [streamingProviders, setStreamingProviders] = useState('')
  const [favoriteMovie, setFavoriteMovie] = useState('')
  

  const getUserInfo = () => {
    axios({
      method: 'get',
      url: 'users/:id',
      baseURL: 'https://powerful-garden-94854.herokuapp.com/',
      params: {
        _id: props.currentUser._id
      }
    }).then((response) => {
      setCurrentUserInfo(response.data)
    })
  }
  
  const getFavorites = () => {
      axios({
          method: 'get',
          url: '/favorites',
          baseURL:'https://powerful-garden-94854.herokuapp.com'
      }).then((response) => {
          setFavorites(response.data)
          console.log(response.data);
      })
  }

  const getWatchList = () => {
      axios({
          method: 'get',
          url: '/watchlist',
          baseURL:'https://powerful-garden-94854.herokuapp.com'
      }).then((response) => {
          setWatchList(response.data)
          console.log(response.data);
      })
  }
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

    const handleMovieAdd = (movie) => {
      axios({
        method: 'post',
        url: '/favorites',
        baseURL:'https://powerful-garden-94854.herokuapp.com',
        data:[
          movie
        ]
      })
      console.log(movie);
    }

    const handleWatchListAdd = (movie) => {
      axios({
        method: 'post',
        url: '/watchlist',
        baseURL:'https://powerful-garden-94854.herokuapp.com',
        data:[
          movie
        ]
      })
      console.log(movie);
    }

  const handleFavoriteDelete = (movie) => {
    axios.delete(`https://powerful-garden-94854.herokuapp.com/favorites/${movie._id}`).then(() => {
      axios.get('https://powerful-garden-94854.herokuapp.com/favorites').then((response) => {
        setFavorites(response.data)
      })
    })
  }
  const handleWatchListDelete = (movie) => {
    axios.delete(`https://powerful-garden-94854.herokuapp.com/watchlist/${movie._id}`).then(() => {
      axios.get('https://powerful-garden-94854.herokuapp.com/watchlist').then((response) => {
        setWatchList(response.data)
      })
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
    getUserInfo()
    getFavorites()
    getWatchList()

  }, [])


  return (
    <>
      <header>
        <div>
          <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
        </div>
        <div className='head-button-container d-flex align-items-end justify-content-end'>
          <Link to="/"><i class="bi bi-house house"></i></Link>
          <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </div>
      </header>
        <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
          <Link to="/movies">All Movies</Link>
          <GenreNavBar />
        </div>
        <div className="profile-back-image">
          <h1 className="text-center " id="profile-welcome">Welcome To Your Profile!</h1>
        </div>
        <div className="container d-flex align-items-center justify-content-between user-container">
          <img className="user-image" src='/userimage.png'/>
          <div className="content-box">
          <p>Name: {props.currentUser.name}</p>
          <p>UserName: {props.currentUser.username}</p>
          <p>Favorite Genre:</p>
          <p>Streaming Providers:</p>
          <p>Favorite Movie:</p>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <MovieType heading='Favorites'/>
        </div>
        <div className="container-fluid movies">
          <div className=" d-flex justify-content-start align-items-start scroll">
            {favorites.map((movie) => {
                let img = movie.poster_path
                let full = 'http://image.tmdb.org/t/p/w200' + img;
                return(
                    <div key={movie.id} className="image-container d-flex justify-content-start m-3 ">
                        <img src= {full}/>
                        <button onClick={(event) => {handleFavoriteDelete(movie)}} className="delete-button">X</button>
                        <div className ='overlay2 d-flex flex-row align-items-start justify-content-between'>
                        <div>
                          <p className='movie-title text-left'>{movie.title}</p>
                          
                          </div>
                          <div className="d-flex flex-column justify-content-around">
                            <i class="bi bi-heart-fill heart-icon filled"></i>
                            <i onClick={event => handleWatchListAdd(movie)}class="bi bi-plus-circle-fill plus-icon"></i>
                            <i class="bi bi-check-circle-fill check-icon"></i>
                          </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
        <div className="row mt-4 mb-4">
          <MovieType heading='Want To Watch List'/>
        </div>
        <div className="container-fluid movies">
          <div className=" d-flex justify-content-start align-items-start scroll">
            {watchList.map((movie) => {
                let img = movie.poster_path
                let full = 'http://image.tmdb.org/t/p/w200' + img;
                return(
                    <div key={movie.id} className="image-container d-flex justify-content-start m-3 ">
                        <img src= {full}/>
                        <button onClick={(event) => {handleWatchListDelete(movie)}} className="delete-button">X</button>
                        <div className ='overlay2 d-flex flex-row align-items-start justify-content-between'>
                        <div>
                          <p className='movie-title text-left'>{movie.title}</p>
                          <p className="year">Year:{movie.release_date.substring(0,4)}</p>
                          </div>
                          <div className="d-flex flex-column justify-content-around">
                            <i onClick={event => handleMovieAdd(movie)} class="bi bi-heart-fill heart-icon"></i>
                            <i class="bi bi-plus-circle-fill plus-icon filledPlus"></i>
                            <i class="bi bi-check-circle-fill check-icon"></i>
                          </div>
                        </div>
                    </div>
                )
            })}
          </div>
        </div>
    </>
  )
}

export default UserProfile
