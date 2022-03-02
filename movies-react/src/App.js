import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])

const getMovies = () => {
  axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dad5072890b975c25ff2358e550e5138&language=en-US&page=1').then((response) => {
    setTopRated(response.data.results)
  })
}

useEffect(() => {
  getMovies()
}, [])

  return(
    <>
      <h1>Movies</h1>
      <div>
      {
      topRated.map((movie, index) => {
        return(
          <div key={movie.id}>
          <p>Title: {movie.title} </p>
          
          </div>
        )})
    }
      </div>
    </>
  )
}

export default App;