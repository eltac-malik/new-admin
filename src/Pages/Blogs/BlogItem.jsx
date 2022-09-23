import React, { useEffect, useState } from 'react'
import 'assets/css/Slider.css'
import ModalView from './Modal/addBlog';
import axios from 'axios'
import Remove from 'components/Modal/Remove'
import Restore from 'components/Modal/Restore'
import { useDispatch } from 'react-redux'
import { setText, setId } from 'redux/textSlice'
import Edit from 'components/Modal/Edit';



function BlogItem({e}) {
    return (
        <>
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
        </>
    )
}

export default BlogItem
