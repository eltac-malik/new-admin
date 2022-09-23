import React, { useEffect, useState } from 'react'
import 'assets/css/Slider.css'
import ModalView from './Modal/addBlog';
import axios from 'axios'
import Remove from 'components/Modal/Remove'
import Restore from 'components/Modal/Restore'
import { useDispatch } from 'react-redux'
import { setText, setId } from 'redux/textSlice'
import Edit from 'components/Modal/Edit';

function Blog() {


  const [blogs, setBlogs] = useState([]);
  const [show, setShow] = useState(false)
  const [remshow, setRemShow] = useState(false)
  const [editshow, setEditShow] = useState(false)
  const dispatch = useDispatch()


  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("Atoken"));
    axios
      .get("http://ejtacmalik-001-site1.btempurl.com/api/Blogs", {
        headers: {
          Authorization: "Bearer " + x,
        },
      })
      .then((resp) => setBlogs(resp.data))
  }, []);

  
  const handleRemove = (e) => {
    dispatch(setText(e))
    setRemShow(true)

  }

  

  return (
    <div className='slider'>
      <div className="add-slid">
        <h1>Blog</h1>
        <p className='new-p' onClick={() => setShow(true)} data-toggle="modal" data-target="#exampleModal">Create Blog</p>
      </div>
      <ModalView show={show} setShow={setShow} setBlogs={setBlogs} />
      <div className="slider-list">
        <div className="slid-head">
          <p>id</p>
        </div>
        {
          blogs && blogs.filter(e=> e.isDeleted !== true).map(e => {
            return (
              <div key={e.id} className="slid-one">
                <p>{e.id}</p>
                <p>{e.name}</p>
                <p>{e.mainBlog}</p>
                <div className="func-btn">
                  <p className='slid-edit' onClick={() => {
                    setEditShow(true)
                    dispatch(setId(e.id))
                  }}>edit</p>
                  <p onClick={() => handleRemove(e)} className='slid-del'>delete</p>
                  <Remove remshow={remshow} setRemShow={setRemShow} setBlogs={setBlogs} />
                  <Edit editshow={editshow} setEditShow={setEditShow} setBlogs={setBlogs} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Blog