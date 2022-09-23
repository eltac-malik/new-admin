import React, { useState,useEffect } from 'react'
import './Modal.css'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Modal'
import axios from 'axios'
import {setEvenData} from 'redux/textSlice'

function Edit({editshow, setEditShow,setSlid}) {

    const identifier = useSelector(state => state.text.slidId)
    const [newimg,setImg] = useState(null)
    const dispatch = useDispatch()    

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("Atoken"));
    axios
      .get(`http://ejtacmalik-001-site1.btempurl.com/api/admin/Sliders/${identifier}`, {
        headers: {
          Authorization: "Bearer " + x,
        },
      })
      .then((resp) => dispatch(setEvenData(resp.data)));
  }, [identifier&&identifier]);
  

  const evenSlid = useSelector(state => state.text.evenData)


    const handleEditModal = ()=>
    {
        setEditShow(false);
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
          .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Sliders/getall", {
            headers: {
              Authorization: "Bearer " + x,
            },
          })
          .then((resp) => setSlid(resp.data));


    }

    return (
        <div>
         
         <Modal className='modded' show={editshow} >
                    <div className="modal-content">
                        <Modal.Header>
                            <button onClick={()=> setEditShow(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <Formik
                             enableReinitialize={true}
                                initialValues={
                                    {
                                        maint: evenSlid&&evenSlid.mainTitle,
                                        sub: evenSlid&&evenSlid.subTitle,
                                        image: newimg&&newimg,
                                        desc: evenSlid&&evenSlid.description
                                    }
                                }
                                onSubmit={(x) => {
                                    const formdata = new FormData();
                                    formdata.append("Id",evenSlid&&evenSlid.id)
                                    formdata.append("MainTitle", x.maint)
                                    formdata.append("SubTitle", x.sub)
                                    formdata.append("Description", x.desc)
                                    formdata.append("File", newimg?newimg:evenSlid.image)
                                    
                                    let token = JSON.parse(localStorage.getItem("Atoken"));

                                    let url = `http://ejtacmalik-001-site1.btempurl.com/api/admin/Sliders/${evenSlid&&evenSlid.id}`
                                    fetch(url, {
                                        method: 'PUT',
                                        headers: {
                                            "Authorization": "Bearer " + token,
                                        },
                                        body: formdata,
                                    })
                                        .then(resp => {
                                            if (resp.status === 204) {
                                                handleEditModal()
                                            }
                                        }
                                        )

                                }}
                            >
                                <Form>

                                    <div className="slid-area">
                                        <label htmlFor="main">Main Title</label>
                                        <Field name='maint' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Sub Title</label>
                                        <Field name='sub' type="text" id='main' />
                                    </div>
                                    
                                    <div className="slid-area">
                                        <label htmlFor="main">Select image</label>
                                        <div className="slid-all">
                                            {
                                                newimg===null?
                                                <div className="current-img">
                                                <img src={`http://ejtacmalik-001-site1.btempurl.com/Sliders/${evenSlid.image}`} alt=""/>
                                                </div>
                                                :
                                                <p className='img-path'>{newimg&&newimg.name}</p>
                                            }
                                        <div className="select-file">
                                                <i className="bi bi-link-45deg"></i>
                                                <input onChange={(e) => setImg(e.target.files[0])}   name='image' type="file" className='custom-file-input' accept="image/jpeg" id='main' />
                                        </div>

                                        </div>
                                    </div>





                                    <div className="slid-area area-t">
                                        <label htmlFor="main">Description</label>
                                        <Field name='desc' className='area' as='textarea' />
                                    </div>
                                    <div className="slid-btn">
                                    <input className='sub-input' type="submit" /></div>
                                </Form>
                            </Formik>

                        </Modal.Body>
                    </div>
                
            </Modal>




        </div>
    )
}

export default Edit