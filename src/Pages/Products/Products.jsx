import React, { useEffect, useState } from 'react'
import 'assets/css/Product.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setText, setId } from 'redux/textSlice'
import ProductItem from './ProductItem'

function Brands() {

    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Products/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => setProducts(resp.data));
    }, [])

    return (
        <div className='brands'>
            <div className="add-brands">
                <h1>Products</h1>
                <p className='new-p' onClick={() => navigate('/addproducts')} data-toggle="modal" data-target="#exampleModal">Create Product</p>
            </div>



            <div className="slider-list">
                <div className="slid-head">
                    <p>id</p>
                </div>
                {
                    products && products.filter(e=> e.isDeleted !==true).map(e => {
                        return (
                            <ProductItem setProducts={setProducts} e={e}/>
                        )
                    })
                }
            </div>














        </div>
    )
}

export default Brands