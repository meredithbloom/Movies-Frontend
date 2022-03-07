
//meredith : i used the below video to help with react user authentication. instead of importing both useContext and AuthContext to every file, Dave Gray recommended consolidating the information into a custom hook that I can then reference
//https://www.youtube.com/watch?v=oUZjO00NkhY&ab_channel=DaveGray


import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;