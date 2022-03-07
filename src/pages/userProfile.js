import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import MovieType from '../components/headingTitle'
import DailyShows from '../components/dailyShows'
import TrendingMovies from '../components/trendingmovies'
import axios from 'axios'
import GenreNavBar from '../components/genreNavMenu'

const UserProfile = (props) => {
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [watchList, setWatchList] = useState([])
  const [search, setSearch] = useState([])
  const [searchString, setSearchString] = useState('')
  const [currentUserInfo, setCurrentUserInfo] = useState({})
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const [streamingProviders, setStreamingProviders] = useState('')
  const [favoriteMovie, setFavoriteMovie] = useState('')


  const getUserInfo = (props) => {
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

  const handleFavoriteGenre = (event) => {
    setFavoriteGenre(event.target.value);
  }
  const handleStreamingProviders = (event) => {
    setStreamingProviders(event.target.value);
  }
  const handleFavoriteMovie = (event) => {
    setFavoriteMovie(event.target.value);
  }

  const handleUserSubmitForm = (event) => {
    event.preventDefault()
    axios.put(
      'https://powerful-garden-94854.herokuapp.com/users/_:id',
      {
        favoriteGenre: favoriteGenre,
        streamingProviders:streamingProviders,
        favoriteMovie:favoriteMovie
      }
    ).then(() => {
      axios.get('https://powerful-garden-94854.herokuapp.com/users/_:id').then((response) => {
        setFavoriteGenre(favoriteGenre)
        setStreamingProviders(streamingProviders)
        setFavoriteMovie(favoriteMovie)
      })
    })
  }

  useEffect(() => {
    getFavorites()
    getWatchList()
  }, [])


  return(
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
        <p>Name: {currentUserInfo.name}</p>
        <p>UserName:{currentUserInfo.username}</p>
        <p>Favorite Genre: {favoriteGenre}</p>
        <p>Streaming Providers: {streamingProviders}</p>
        <p>Favorite Movie: {favoriteMovie}</p>
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
                      <p className="year">Year:{movie.release_date}</p>
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
                      <p className="year">Year:{movie.release_date}</p>
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
      <div className="form-container container d-flex flex-column
      align-items-center">
        <div className="form-title">
          <h2>Update Your Profile</h2>
        </div>
        <form onSubmit={handleUserSubmitForm}>
          <input className="update" type='text' onChange={handleFavoriteGenre}/><br/>
          <label>Streaming Providers:</label><br/>
          <input className="update" type='text' onChange={handleStreamingProviders}/><br/>
          <label>Favorite Movie:</label><br/>
          <input className="update" type='text' onChange={handleFavoriteMovie}/><br/>
          <input className="submit-button mt-4 " type='submit' value='Update Profile'/>
        </form>
      </div>
    </>
  )
}

export default UserProfile
