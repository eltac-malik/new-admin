import React, { useState } from 'react'
import 'components/Modal/Modal.css'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

function ModalView({show,setShow,setBlogs}) {

    const [imager, setImager] = useState(null)
    const navigate = useNavigate()

    return (
        <div className='mod-all'>
            <Modal show={show} >
                    <div className="modal-content">
                        <Modal.Header>
                            <button onClick={()=> setShow(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body className="modal-body">

                            <Formik
                                initialValues={
                                    {
                                        name: "",
                                        maint: "",
                                        sub: "",
                                    }
                                }
                                onSubmit={(x) => {
                                    const formdata = new FormData();
                                    formdata.append("Name", x.name)
                                    formdata.append("MainBlog", x.main)
                                    formdata.append("SubBlog", x.sub)
                                    formdata.append("File", imager)


                                    let token = JSON.parse(localStorage.getItem("Atoken"));

                                    let url = "http://ejtacmalik-001-site1.btempurl.com/api/admin/Blogs/create"
                                    fetch(url, {
                                        method: 'post',
                                        headers: {
                                            "Authorization": "Bearer " + token,
                                        },
                                        body: formdata,
                                    })
                                        .then(resp => {
                                            if (resp.status === 201) {
                                                setShow(false);
                                                let x = JSON.parse(localStorage.getItem("Atoken"));
                                                axios
                                                  .get("http://ejtacmalik-001-site1.btempurl.com/api/Blogs", {
                                                    headers: {
                                                      Authorization: "Bearer " + x,
                                                    },
                                                  })
                                                  .then((resp) => setBlogs(resp.data));
                                            }
                                        }
                                        )

                                }}
                            >
                                <Form>

                                    <div className="slid-area">
                                        <label htmlFor="main">Blog Name</label>
                                        <Field name='name' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Main Title</label>
                                        <Field name='main' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Sub Title</label>
                                        <Field name='sub' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Select image</label>
                                        <div className="select-file">
                                            <i className="bi bi-link-45deg"></i>
                                            <input onChange={(e) => setImager(e.target.files[0])} name='image' type="file" className='custom-file-input' accept="image/jpeg" id='main' />
                                        </div>
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

export default ModalView