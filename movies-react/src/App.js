import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [movies, setMovies] = useState([])
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])
  const [image, setImage] = useState([])
  const [pageNum, setPageNum] = useState([])




useEffect(() => {

}, [])

//Think about hardcoding the top movies and new releases
  return(
    <>
    <header>
      <h2 className="title">Cinema Wave</h2>
      <div className='head-button-container'>
        <button className="signup">Sign Up</button>
        <button className="login">Log In</button>
      </div>
    </header>
    <div>

    </div>
      <h1>Movies/Shows</h1>

    </>
  )
}

export default App;
