import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'

function Remove({remshow,setRemShow,setBrands}) {
    
  const x = useSelector(state => state.text.text)
  const handleClose = () => {setRemShow(false) };
  
  
    const handleRemoveModal = ()=>
    {
             
      let token = JSON.parse(localStorage.getItem("Atoken"));
      axios.delete(`http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/${x.id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        }
      }).then(resp=> 
        {
          if (resp.status===204)
          {
            axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/getall", {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((resp) => setBrands(resp.data))
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
                <Modal.Body>Are you sure delete <strong>{x.name}</strong> slider?</Modal.Body>
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