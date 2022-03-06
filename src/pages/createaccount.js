import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image'
import MoviesByGenre from '../components/moviesByGenre'

const CreateAccount = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [profPic, setProfPic] = useState('https://www.kindpng.com/picc/m/107-1079551_cinema-vector-popcorn-with-cartoon-film-3d-clipart.png')

    const [toggleError, setToggleError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentUser, setCurrentUser] = useState({})


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
        <div className="new-user-form formContainer">
            <h1 className="formTitle">Create an Account</h1>
            <form onSubmit={handleNewUser} className="input-form">
                <input type="text" placeholder="name" className="text-input" onChange={(event) => {setName(event.target.value)}}/>
                <input type="text" placeholder="email" className="text-input" onChange={(event) => {setEmail(event.target.value)}}/>
                <input type="text" placeholder="username" className="text-input" onChange={(event) => {setUsername(event.target.value)}}/>
                <input type="password" placeholder="password" className="text-input" onChange={(event) => {setPassword(event.target.value)}}/>
                <input type="text" placeholder="profile picture" onChange={(event) => {setProfPic(event.target.value)}}/>
                
                {toggleError ?
                <h5 className="error-msg">{errorMessage}</h5>
                :
                null
            }
            <input type="submit" value="Register" className="submit-btn"/>
            </form>
        </div>
    )
}

export default CreateAccount