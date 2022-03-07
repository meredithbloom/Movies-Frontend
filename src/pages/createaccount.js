import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image'


const CreateAccount = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profPic, setProfPic] = useState('https://www.kindpng.com/picc/m/107-1079551_cinema-vector-popcorn-with-cartoon-film-3d-clipart.png')

    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
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


    const handleNewUser = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: '/users/createaccount',
            baseURL: 'http://localhost:3003',
            data: {
                name: name,
                email: email,
                username: username,
                password: password, 
                profPic: profPic
            }
        })
        .then((response) => {
            if (response.data.username) {
                console.log(response)
                setToggleError(false)
                setErrorMessage('')
                setCurrentUser(response.data)
            } else {
                setErrorMessage(response.data)
                setToggleError(true)
            }
        })
    }
            
    return (
        <>
            <header>
                <div>
                    <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
                </div>
                <div className='head-button-container d-flex align-items-center'>
                    <Link to="/login">Log In</Link>
                    <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </div>
            </header>
            <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
                <Link to="/movies">All Movies</Link>
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
            </div>
            <div className="new-user-form formContainer">
                <h1 className="formTitle">Create an Account</h1>
                <form onSubmit={handleNewUser} className="input-form">
                    <input type="text" placeholder="name" className="text-input" onChange={(event) => {setName(event.target.value)}}/>
                    <br/><br/>
                    <input type="text" placeholder="email" className="text-input" onChange={(event) => {setEmail(event.target.value)}}/>
                    <br/><br/>
                    <input type="text" placeholder="username" className="text-input" onChange={(event) => {setUsername(event.target.value)}}/>
                    <br/><br/>
                    <input type="password" placeholder="password" className="text-input" onChange={(event) => {setPassword(event.target.value)}}/>
            
                    
                    {toggleError ?
                    <h5 className="error-msg">{errorMessage}</h5>
                    :
                    null
                }
                <br/><br/>
                <input type="submit" value="Register" className="submit-btn"/>
                </form>
            </div>
        </>
    )
}

export default CreateAccount