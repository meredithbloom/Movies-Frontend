import {useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { propTypes } from 'react-bootstrap/esm/Image'
import GenreNavBar from '../components/genreNavMenu'


//user object - either logged in or not - will be passed as props
const Header = (props) => {
    return (
        <>
            <header>
                <div>
                <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
                </div>
                <div className='head-button-container d-flex align-items-center'>
                <Link to="/newaccount">Sign Up</Link>
                <Link to="/login">Log In</Link>
                <Link to="/profile"><i class="bi bi-person user"></i></Link>
                <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                </div>
            </header>        
        </>
    )
    
}