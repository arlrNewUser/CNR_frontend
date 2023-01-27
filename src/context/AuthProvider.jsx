import { useState, useEffect, createContext } from 'react'
import clientAxios from '../../config/axios' 

const AuthContext = createContext()
const AuthProvider = ({children}) => {

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clientAxios('/users/profile', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
            
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        console.log("has cerrado sesión")
        localStorage.removeItem('token')
        setAuth({})
    }

    return(
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion,
                setCargando,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext
