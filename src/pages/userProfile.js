import {Link} from 'react-router-dom'
import {useState} from 'react'

const User = () => {
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

  return(
    <>
    <header>
    <div>
      <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
    </div>
      <div className='head-button-container d-flex align-items-center'>
        <Link to="/profile"><i class="bi bi-person user"></i></Link>
        <Link to="/"><i class="bi bi-house house"></i></Link>
        </div>
      </header>
      <h1 className="text-center">Welcome To Your Profile!</h1>

    </>
  )
}

export default User
