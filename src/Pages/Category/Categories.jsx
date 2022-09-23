import React, { useEffect, useState } from 'react'
import 'assets/css/Slider.css'
import ModalView from './Modal/addCategory';
import axios from 'axios'
import Remove from './Modal/delCategories'
import Restore from 'components/Modal/Restore'
import { useDispatch,useSelector } from 'react-redux'
import { setText, setId } from 'redux/textSlice'
import Edit from './Modal/editCategoty';

function Category() {


  const [category, setCategory] = useState([]);
  const [show, setShow] = useState(false)
  const [remshow, setRemShow] = useState(false)
  const [editshow, setEditShow] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("Atoken"));
    axios
      .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories/getall", {
        headers: {
          Authorization: "Bearer " + x,
        },
      })
      .then((resp) => setCategory(resp.data))
  }, []);

  
  const handleRemove = (e) => {
    dispatch(setText(e))
    setRemShow(true)

  }

  

  return (
    <div className='slider'>
      <div className="add-slid">
        <h1>Category</h1>
        <p className='new-p' onClick={() => setShow(true)} data-toggle="modal" data-target="#exampleModal">Create Category</p>
      </div>
      <ModalView show={show} setShow={setShow} setCategory={setCategory} />
      <div className="slider-list">
        <div className="slid-head">
          <p>id</p>
        </div>
        {
          category && category.filter(e=> e.isDeleted !== true).map(e => {
            return (
              <div key={e.id} className="slid-one">
                <p>{e.id}</p>
                <p>{e.name}</p>
                <div className="func-btn">
                  <p className='slid-edit' onClick={() => {
                    setEditShow(true)
                    dispatch(setId(e.id))
                  }}>edit</p>
                  <p onClick={() => handleRemove(e)} className='slid-del'>delete</p>
                  <Remove remshow={remshow} setRemShow={setRemShow} setCategory={setCategory} />
                  <Edit editshow={editshow} setEditShow={setEditShow} setCategory={setCategory} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Category