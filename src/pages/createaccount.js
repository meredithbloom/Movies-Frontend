import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image'
import GenreNavBar from '../components/genreNavMenu'
import Dropdown from 'react-bootstrap/Dropdown'



const CreateAccount = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const [streamingProviders, setStreamingProviders] = useState('')
    const [favoriteMovie, setFavoriteMovie] = useState('')
    const [profPic, setProfPic] = useState('https://www.kindpng.com/picc/m/107-1079551_cinema-vector-popcorn-with-cartoon-film-3d-clipart.png')

    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [opacity, setOpacity] = useState(0)
    const [zIndex, setzIndex] = useState(0)


    const setMenuOpacity = (event) => {
        if (opacity == 1) {
          setOpacity(0)
          setzIndex(0)
        }else if(opacity == 0){
          setOpacity(1)
          setzIndex(2)
        }
    }

    const triggerNewUser = (event) => {
        event.preventDefault()
        let newUser = {
            name: name,
            email: email,
            username: username,
            password: password, 
            favoriteGenre: favoriteGenre,
            streamingProviders: streamingProviders,
            favoriteMovie: favoriteMovie
        }
        props.handleNewUser(newUser)
    }

    const handleSelect = (event) => {
        setFavoriteGenre(event.target.value)
    }

    return (
        <>
            <header>
                <div>
                    <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
                </div>
                <div className='head-button-container d-flex align-items-center'>
                    <>
                        {props.loggedIn ? (
                            <Link to="/profile"><i class="bi bi-person user"></i></Link>
                        ) : (
                            <Link to="/login"><button className="login">Log In</button></Link>
                        )}
                    </>
                    <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </header>
            <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
                <GenreNavBar/>
            </div>
            <>
                {success ? (
                    <h1>Welcome, {username}!</h1>
                ) : (
                    <section className="new-user-form formContainer container d-flex flex-column justify-content-center align-items-center">
                        <h1 className="formTitle">Create an Account</h1>
                            <form onSubmit={triggerNewUser} className="input-form">
                                
                            <input type="text" placeholder="name" className="text-input" onChange={(event) => {setName(event.target.value)}}/>
                                <br /><br />
                                
                            <input type="text" placeholder="email" className="text-input" onChange={(event) => {setEmail(event.target.value)}}/>
                                <br /><br />
                                
                            <input type="text" placeholder="username" className="text-input" onChange={(event) => {setUsername(event.target.value)}}/>
                                <br /><br />
                                
                            <input type="password" placeholder="password" className="text-input" onChange={(event) => { setPassword(event.target.value) }} />
                                <br /><br />
                                
        
                            <input type="text" placeholder="favorite genre" className="text-input" onChange={(event) => { setFavoriteGenre(event.target.value) }} />
                            <br/>
                                
                            <input type="text" placeholder="streaming providers" className="text-input" onChange={(event) => { setStreamingProviders(event.target.value) }} />
                            <br />
                                
                             <input type="text" placeholder="favorite movie" className="text-input" onChange={(event) => { setFavoriteMovie(event.target.value) }} />
                            <br/>
                            {toggleError ?
                            <h5 className="error-msg">{errorMessage}</h5>
                            :
                            null
                        }
                        <br/><br/>
                        <input type="submit" value="Register" className="submit-btn signup"/>
                        </form>
                    </section>
                )}
            </>
        </>
    )
}

export default CreateAccount
