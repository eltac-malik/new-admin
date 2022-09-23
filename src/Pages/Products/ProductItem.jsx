import React,{useState} from 'react'
import Edit from 'Pages/Products/ProductModal/editProduct'
import Remove from 'Pages/Products/ProductModal/delProduct'
import { useDispatch } from 'react-redux'
import { setText, setId } from 'redux/textSlice'


function ProductItem({e,setProducts}) {

    const [modEdit,setModEdit] = useState(false)
    const [remshow, setRemShow] = useState(false)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const handleRemove = (e) => {
        dispatch(setText(e))
        setRemShow(true)
    
      }
    

    return (
        <>
                                        <div key={e.id} className="slid-one">
                                <p>{e.id}</p>
                                <p>{e.name} {e.code}</p>
                                <div className="func-btn">
                                    <p className='slid-edit' onClick={() => {
                                        setModEdit(true)
                                        dispatch(setId(e.id))
                                    }}>edit</p>
                                    <p onClick={() => handleRemove(e)} className='slid-del'>delete</p>
                                    <Remove remshow={remshow} setRemShow={setRemShow} setProducts={setProducts} />
                                    <Edit modEdit={modEdit} setModEdit={setModEdit} e={e} setProducts={setProducts} /> 
                                </div>
                            </div>
        </>
    )
}

export default ProductItem
