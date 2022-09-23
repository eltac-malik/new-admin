import React, { useEffect, useState } from 'react'
import 'assets/css/Brands.css'
import axios from 'axios'
import AddModal from 'Pages/Brands/BrandModal/addBrand';
import Edit from './BrandModal/editModal'
import Remove from './BrandModal/delBrand'
import { useDispatch } from 'react-redux'
import { setText, setId } from 'redux/textSlice'

function Brands() {

    const [show, setShow] = useState(false)
    const [brands, setBrands] = useState([])
    const [modEdit,setModEdit] = useState(false)
    const [remshow, setRemShow] = useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => setBrands(resp.data));
    }, [])


    const handleRemove = (e) => {
        dispatch(setText(e))
        setRemShow(true)
    
      }
    
      

    return (
        <div className='brands'>
            <div className="add-brands">
                <h1>Brands</h1>
                <p className='new-p' onClick={() => setShow(true)} data-toggle="modal" data-target="#exampleModal">Create Brand</p>
            </div>
        <AddModal show={show} setShow={setShow} setBrands={setBrands} />




            <div className="slider-list">
                <div className="slid-head">
                    <p>id</p>
                </div>
                {
                    brands && brands.filter(e=> e.isDeleted !==true).map(e => {
                        return (
                            <div key={e.id} className="slid-one">
                                <p>{e.id}</p>
                                <p>{e.name}</p>
                                <div className="func-btn">
                                    <p className='slid-edit' onClick={() => {
                                        setModEdit(true)
                                        dispatch(setId(e.id))
                                    }}>edit</p>
                                    <p onClick={() => handleRemove(e)} className='slid-del'>delete</p>
                                    <Remove remshow={remshow} setRemShow={setRemShow} setBrands={setBrands} />
                                    <Edit modEdit={modEdit} setModEdit={setModEdit} setBrands={setBrands} /> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>



        </div>
    )
}

export default Brands