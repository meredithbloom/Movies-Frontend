import {useState, useEffect} from 'react'
import Search from '../components/search'
import MovieType from '../components/headingTitle'
import axios from 'axios'



const SearchPage = () => {
    const [search, setSearch] = useState([])
    const [searchString, setSearchString] = useState('')

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


  return(
    <>
    <div ClassName="content">

    </div>
    </>
  )
}

export default SearchPage
