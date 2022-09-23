import React, { useState, useEffect } from 'react'
import 'components/Modal/Modal.css'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Modal'
import axios from 'axios'
import { setEvenData } from 'redux/textSlice'

function Edit({ editshow, setEditShow, setCategory }) {

    const identifier = useSelector(state => state.text.slidId)
    const [newimg, setImg] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get(`http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories/${identifier}`, {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => dispatch(setEvenData(resp.data)));
    }, [identifier&&identifier]);


    const evenSlid = useSelector(state => state.text.evenData)
    

    const handleEditModal = () => {
        setEditShow(false);
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => setCategory(resp.data))
    }

    return (
        <div>

            <Modal className='modded' show={editshow} >
                <div className="modal-content">
                    <Modal.Header>
                        <button onClick={() => setEditShow(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                        <Formik
                            enableReinitialize={true}
                            initialValues={
                                {
                                    catname: evenSlid && evenSlid.name,
                                }
                            }
                            onSubmit={(x) => {
                                let token = JSON.parse(localStorage.getItem("Atoken"));
                                let url = `http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories/${evenSlid && evenSlid.id}`
                                let editCategory = 
                                {
                                    id: evenSlid&&evenSlid.id,
                                    name: x.catname
                                }
                                fetch(url, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': "application/json; charset=utf-8",
                                        "Authorization": "Bearer " + token,
                                    },
                                    body: JSON.stringify(editCategory),
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
                                    <label htmlFor="main">Category Name</label>
                                    <Field name='catname' type="text" id='main' />
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