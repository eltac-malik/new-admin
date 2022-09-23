import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import {useSelector} from "react-redux"
import axios from 'axios'

function Remove({remshow,setRemShow,setSlid}) {
    
  const handleClose = () => setRemShow(false);
  const handleShow = () => setRemShow(true);

  const x = useSelector(state => state.text.text)
  
    const handleRemoveModal = ()=>
    {
             
      let token = JSON.parse(localStorage.getItem("Atoken"));
      axios.delete(`http://ejtacmalik-001-site1.btempurl.com/api/admin/Sliders/${x.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }).then(resp=> 
        {
          if (resp.status===204)
          {
            axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Sliders/getall", {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((resp) => setSlid(resp.data))
            .then(()=> setRemShow(false))
          }
        }
      )
    }


    return (
        <div>
            <Modal show={remshow} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Are you sure delete <strong>{x.mainTitle}</strong> slider?</Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="secondary" onClick={()=>handleRemoveModal()}>Delete </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Remove