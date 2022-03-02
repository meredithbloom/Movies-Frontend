import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [topmovies, setTopMovies] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])

const getMovies = () => {
//axios.get
}

useEffect(() => {
  getMovies()
}, [])

  return(
    <>
      <h1>Movies</h1>
    </>
  )
}

export default App;
