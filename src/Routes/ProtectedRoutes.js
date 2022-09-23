import React from 'react'
import { Outlet ,Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux'


function ProtectedRoutes()
{
    const x = useSelector(state => state.login.isLogged)

    return x ==true ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoutes