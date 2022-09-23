import React, { useState,useEffect } from 'react'
import 'components/Modal/Modal.css'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Modal'
import axios from 'axios'
import {setEvenData} from 'redux/textSlice'

function Edit({modEdit, setModEdit,setBrands}) {

    const identifier = useSelector(state => state.text.slidId)
    const [newimg,setImg] = useState(null)
    const dispatch = useDispatch()    

  useEffect(() => {
    let x = JSON.parse(localStorage.getItem("Atoken"));
    axios
      .get(`http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/${identifier}`, {
        headers: {
          Authorization: "Bearer " + x,
        },
      })
      .then((resp) => dispatch(setEvenData(resp.data)));
  }, [identifier&&identifier]);
  

  const evenSlid = useSelector(state => state.text.evenData)
  


    const handleEditModal = ()=>
    {
        setModEdit(false);
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
          .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/getall", {
            headers: {
              Authorization: "Bearer " + x,
            },
          })
          .then((resp) => setBrands(resp.data));
    }

    return (
        <div>
         
         <Modal className='modded' show={modEdit} >
                    <div className="modal-content">
                        <Modal.Header>
                            <button onClick={()=> setModEdit(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </Modal.Header>
                        <Modal.Body className="modal-body">
                            <Formik
                             enableReinitialize={true}
                                initialValues={
                                    {
                                        name: evenSlid&&evenSlid.name,
                                    }
                                }
                                onSubmit={(x) => {
                                    let numId = Number(evenSlid&&evenSlid.id)
                                    const formdata = new FormData();
                                    formdata.append("Id",numId)
                                    formdata.append("Name",x.name)
                                    formdata.append("File", newimg?newimg:evenSlid.image)

                                    let token = JSON.parse(localStorage.getItem("Atoken"));
                                    let url = `http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/${evenSlid&&evenSlid.id}`
                                    fetch(url, {
                                        method: 'PUT',
                                        headers: {
                                            "Authorization": "Bearer " + token,
                                        },
                                        body: formdata,
                                    })
                                        .then(resp => {
                                            console.log(resp.body)
                                            if (resp.status === 204) {
                                                handleEditModal()
                                            }
                                        }
                                        )
                                }
                                }
                            >
                                <Form>

                                    <div className="slid-area">
                                        <label htmlFor="main">Brand Name</label>
                                        <Field name='name' type="text" id='main' />
                                    </div>
                                    
                                    <div className="slid-area">
                                        <label htmlFor="main">Select image</label>
                                        <div className="slid-all">
                                            {
                                                newimg===null?
                                                <div className="current-img">
                                                <img src={`http://ejtacmalik-001-site1.btempurl.com/Brands/${evenSlid&&evenSlid.image}`} alt=""/>
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