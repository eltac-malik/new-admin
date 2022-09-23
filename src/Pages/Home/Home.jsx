import React,{useEffect,useState} from 'react'
import { useJwt,isExpired,decodeToken } from "react-jwt";


function Home() {
    const [token,setToken] = useState('')
    useEffect(()=>
    {
        setToken(localStorage.getItem("token"))
    },[])

    let vusal = decodeToken(token)

    
    

    return (
        <div >
            salam
        </div>
    )
}

export default Home