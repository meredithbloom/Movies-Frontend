import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


const GenreNavBar = () => {
    return(
        <>
            <h2>Search By Genre</h2>
            <Link to="/action">Action</Link>
            <Link to="/adventure">Adventure</Link>
            <Link to="/comedy">Comedy</Link>
            <Link to="/documentary">Documentary</Link>
            <Link to="/drama">Drama</Link>
            <Link to="/family">Family</Link>
            <Link to="/fantasy">Fantasy</Link>
            <Link to="/horror">Horror</Link>
            <Link to="/romance">Romance</Link>
            <Link to="/thriller">Thriller</Link>
        </>
    )
}

export default GenreNavBar