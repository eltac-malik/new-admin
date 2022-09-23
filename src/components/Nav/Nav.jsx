import React, { useState } from 'react'
import './Nav.css'
import {Link,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setLog} from 'redux/loginSlice'

function Nav() {

    const [resp, setResp] = useState("")
    const [nav, setNav] = useState("navs")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <>
            <div className={`navs`}>
                <div className={`  ${resp}`}>
                    <div className="nav-img">
                        <img src="https://cdn.shopify.com/s/files/1/0039/3740/2989/files/Timekeeper-b_150x.png?v=1559116234" alt="" />

                    </div>
                    
                </div>
                <Link to='/users' className='sidel'><span></span>Users</Link>
                <Link to='/blog' className='sidel'><span></span>Blogs</Link>
                <Link to='/products' className='sidel'><span></span>Products</Link>
                <Link to='/category' className='sidel'><span></span>Categories</Link>
                <Link to='/brands' className='sidel'><span></span>Brands</Link>
                <Link to='/slider' className='sidel'><span></span>Sliders</Link>
                <p onClick={()=>
                {
                    localStorage.setItem("Atoken",null)
                    localStorage.setItem("route",JSON.stringify(false))
                    dispatch(setLog(JSON.parse(localStorage.getItem("route"))))
                    navigate("/")
                }} className='sidel'><span></span>Log out</p>
            </div>

        </>
    )
}

export default Nav