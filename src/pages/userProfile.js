import {Link} from 'react-router-dom'
import {useState} from 'react'
import MovieType from '../components/headingTitle'
import DailyShows from '../components/dailyShows'
import TrendingMovies from '../components/trendingmovies'
import GenreNavBar from '../components/genreNavMenu'



//needs some current user state? 
const UserProfile = () => {
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [favorites, setFavorites] = useState([])
  const [watchList, setWatchList] = useState([])
  const [user, setUser] = useState({})




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
        {favorites}
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
