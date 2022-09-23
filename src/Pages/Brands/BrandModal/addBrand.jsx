import React, { useState } from 'react'
import 'components/Modal/Modal.css'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'

function AddModal({show,setShow,setBrands}) {

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
                                        brandname: "",
                                    }
                                }
                                onSubmit={(x) => {
                                    const formdata = new FormData();
                                    formdata.append("Name", x.brandname)
                                    formdata.append("File", brandImg)
                                    let token = JSON.parse(localStorage.getItem("Atoken"));


                                     let url = "http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands"

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
                                                  .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/getall", {
                                                    headers: {
                                                      Authorization: "Bearer " + x,
                                                    },
                                                  })
                                                  .then((resp) => setBrands(resp.data));
                                            }
                                        }
                                        ).catch(err=> console.log(err))

                                 }
                            
                            }
                            >
                                <Form>

                                    <div className="slid-area">
                                        <label htmlFor="main">Brand Name</label>
                                        <Field name='brandname' type="text" id='main' />
                                    </div>
                                    <div className="slid-area">
                                        <label htmlFor="main">Select image</label>
                                        
                                        <div className="slid-all">
                                            {
                                                brandImg!==null&&<p>{brandImg&&brandImg.image}</p>
                                            }
                                            </div>
                                        <div className="select-file">
                                            <i className="bi bi-link-45deg"></i>
                                            <input onChange={(e) => setBrandImg(e.target.files[0])} name='image' type="file" className='custom-file-input' accept="image/jpeg" id='main' />
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

export default AddModal