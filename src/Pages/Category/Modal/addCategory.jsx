import React, { useState } from 'react'
import 'components/Modal/Modal.css'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

function AddModal({show,setShow,setCategory}) {
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
                                        categoryname: "",
                                    }
                                }
                                onSubmit={(x) => {
                                   
                                    let token = JSON.parse(localStorage.getItem("Atoken"));
                                    let url = "http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories"
                                    let name = x.categoryname
                                    fetch(url, {
                                        method: 'post',
                                        headers: {
                                            'Content-Type': "application/json; charset=utf-8",
                                            "Authorization": "Bearer " + token,
                                        },
                                        body: JSON.stringify({name: name})
                                    }).then(resp => {
                                            if (resp.status === 201) {
                                                setShow(false);
                                                let x = JSON.parse(localStorage.getItem("Atoken"));
                                                axios
                                                  .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories/getall", {
                                                    headers: {
                                                      Authorization: "Bearer " + x
                                                    },
                                                  })
                                                  .then((resp) => setCategory(resp.data));
                                            }
                                        }
                                        )

                                 }
                            
                            }
                            >
                                <Form>

                                    <div className="slid-area">
                                        <label htmlFor="main">Category Name</label>
                                        <Field name='categoryname' type="text" id='main' />
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

export default AddModal