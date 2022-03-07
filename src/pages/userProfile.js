import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import MovieType from '../components/headingTitle'
import DailyShows from '../components/dailyShows'
import TrendingMovies from '../components/trendingmovies'
import axios from 'axios'

const UserProfile = () => {
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [watchList, setWatchList] = useState([])

  const getFavorites = () => {
      axios({
          method: 'get',
          url: '/favorites',
          baseURL:'http://localhost:3000'
      }).then((response) => {
          setFavorites(response.data)
          console.log(response.data);
      })
  }

  const handleDelete = (movie) => {
    axios.delete(`http://localhost:3000/favorites/${movie._id}`).then(() => {
      axios.get('http://localhost:3000/favorites').then((response) => {
        setFavorites(response.data)
      })
    })
  }

  useEffect(() => {
    getFavorites()

  }, [])


  return(
    <>
    <header>
    <div>
      <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
    </div>
      <div className='head-button-container d-flex align-items-center'>
        <Link to="/profile"><i class="bi bi-person user"></i></Link>
        <Link to="/"><i class="bi bi-house house"></i></Link>
        </div>
      </header>
      <div className="profile-back-image">
        <h1 className="text-center">Welcome To Your Profile!</h1>
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <img className="user-image" src='/userimage.png'/>
        <div className="content-box">
        <p>UserName:</p>
        <p>Favorite Genre:</p>
        <p>Streaming Providers:</p>
        <p>Favorite Movie:</p>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <MovieType heading='Favorites'/>
      </div>
      <div className="container-fluid movies">
      <div className="d-flex justify-content-start align-items-start">
        {favorites.map((movie) => {
          return (
            <div key={movie.id} className="image-container d-flex justify-content-start align-items-start m-3">
                <img className="user-movie" src='https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW92aWV8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=200&q=60'/>
                <button onClick={(event) => {handleDelete(movie)}} className="delete-button">X</button>
                <div className ='overlay2 d-flex flex-row align-items-start justify-content-between'>
                <div>
                  <p className='movie-title text-left'>{movie.title}</p>
                  <p className="year">Year:{movie.year}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <i class="bi bi-heart-fill heart-icon filled"></i>
                    <i class="bi bi-plus-circle-fill plus-icon"></i>
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
        {watchList}
      </div>
    </>
  )
}

export default UserProfile
