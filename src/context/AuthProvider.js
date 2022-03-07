//https://www.youtube.com/watch?v=X3qyxo_UTR4&ab_channel=DaveGray
//react user login and authentication with axios

import { createContext, useState } from 'react'


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{ auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext