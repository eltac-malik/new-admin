import React, { useState } from 'react'
import 'components/Modal/Modal.css'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

function AddModal({show,setShow,setUsers}) {

    const [brandImg, setBrandImg] = useState(null)
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
                                        Username: "",
                                        Name:"",
                                        Surname:"",
                                        Email:"",
                                        PhoneNumber:"",
                                        Password:"",
                                        isAdmin:false,
                                    }
                                }
                                onSubmit={(val) => {
                                
                                    let token = JSON.parse(localStorage.getItem("Atoken"));
                                    let url = "http://ejtacmalik-001-site1.btempurl.com/api/admin/Users/register"
                                    console.log(val);
                                    fetch(url, {
                                        method: 'post',
                                        headers: {
                                            "Authorization": "Bearer " + token,
                                            "Content-Type":"application/json"
                                        },
                                        body: JSON.stringify(val),
                                    })
                                        .then(resp => {
                                            if (resp.status === 201) {
                                                setShow(false);
                                                let x = JSON.parse(localStorage.getItem("Atoken"));
                                                axios
                                                  .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Users/getall", {
                                                    headers: {
                                                      Authorization: "Bearer " + x,
                                                     "Content-Type":"application/json"
                                                    },
                                                  })
                                                  .then((resp) => setUsers(resp.data));
                                            }
                                        }
                                        )

                                 }

                            }
                            >
                                <Form>

                                <div className="slid-area">
                                        <label htmlFor="main">Userame</label>
                                        <Field name='Username' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Name</label>
                                        <Field name='Name' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Surname</label>
                                        <Field name='Surname' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">E-mail</label>
                                        <Field name='Email' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Phone</label>
                                        <Field name='PhoneNumber' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Password</label>
                                        <Field name='Password' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Role</label>
                                        <Field name='isAdmin' type="text" id='main' />
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