import React, { useEffect, useState } from 'react'
import 'assets/css/Brands.css'
import axios from 'axios'
import AddModal from './Modal/addUser';
import Edit from 'Pages/Brands/BrandModal/editModal'
import Remove from 'Pages/Users/Modal/delUser'
import { useDispatch } from 'react-redux'
import { setText, setId } from 'redux/textSlice'

function Users() {

    const [show, setShow] = useState(false)
    const [users, setUsers] = useState([])
    const [modEdit,setModEdit] = useState(false)
    const [remshow, setRemShow] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Users/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => setUsers(resp.data));
    }, [])


    const handleRemove = (e) => {
        dispatch(setText(e))
        setRemShow(true)
        console.log(e)
      }
    
      

    return (
        <div className='brands'>
            <div className="add-brands">
                <h1>Users</h1>
                <p className='new-p' onClick={() => setShow(true)} data-toggle="modal" data-target="#exampleModal">Create User</p>
            </div>
        <AddModal  show={show} setShow={setShow} setUsers={setUsers} />




            <div className="slider-list">
                <div className="slid-head">
                    <p>name</p>
                    <p>surname</p>
                    <p></p>
                    <p></p>
                </div>
                {
                    users && users.filter(e=> e.isDeActive !==true).map(e => {
                        return (
                            <div key={e.id} className="slid-one">
                                <p>{e.name}</p>
                                <p>{e.surName}</p>
                                <div className="func-btn">
                                    <p className='slid-edit' onClick={() => {
                                        setModEdit(true)
                                        dispatch(setId(e.userName))
                                    }}>edit</p>
                                    <p onClick={() => handleRemove(e)} className='slid-del'>delete</p>
                                    <Remove remshow={remshow} setRemShow={setRemShow} setUsers={setUsers} />
                                    <Edit modEdit={modEdit} setModEdit={setModEdit} setUsers={setUsers} /> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Users