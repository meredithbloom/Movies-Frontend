import {useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image'
import GenreNavBar from '../components/genreNavMenu'


const Login = (props) => {

    //global context
    // const { setAuth } = useAuth()

    const Navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentUser, setCurrentUser] = useState({})
    const [toggleLogout, setToggleLogout] = useState(false)
    const [toggleLogin, setToggleLogin] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loggedOut, setLoggedOut] = useState(true)

    const [opacity, setOpacity] = useState(0)
    const [zIndex, setzIndex] = useState(0)


    const triggerLogin = (event) => {
        event.preventDefault()
        let userObj = {
            username,
            password
        }
        console.log(userObj)
        props.handleLogin(userObj)
    }


    // const handleToggleLogOut = () => {
    //     if (toggleLogout) {
    //         setToggleLogout(true)
    //     } else {
    //         setToggleLogout(false)
    //     }
    // }

    const setMenuOpacity = (event) => {
        if (opacity == 1) {
          setOpacity(0)
          setzIndex(0)
        }else if(opacity == 0){
          setOpacity(1)
          setzIndex(2)
        }
    }

    return (
        <>
            <header>
                <div>
                    <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
                </div>
                <div className='head-button-container d-flex align-items-center'>
                    <Link to="/newaccount"><button className="signup">Sign Up</button></Link>
                    <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </header>
            <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
                <GenreNavBar/>
            </div>
            <>
                <section className="formContainer container d-flex flex-column justify-content-center align-items-center">
                    <h1 className='form-title'>Login</h1>
                    <form onSubmit={triggerLogin}className="inputForm">
                        <label htmlFor="username">Username: </label>
                        <br/>
                        <input
                            type="text"
                            id="username"
                            className="text-input"
                            onChange={(event) => {setUsername(event.target.value)}}
                            value={username}
                            required
                        />
                        <br/>
                        <label htmlFor="password">Password: </label>
                        <br/>
                        <input
                            type="password"
                            id="password"
                            className="text-input"
                            onChange={(event) => {setPassword(event.target.value)}}
                            value={password}
                            required
                        />

                        {toggleError ?
                        <h5 className="error-msg">{errorMessage}</h5>
                        :
                        null
                        }
                        <br/><br/>
                        <input type="submit" value="Login" className="submit-btn login"/>
                    </form>
                </section>
                )}
            </>
        </>
    )




}

export default Login
