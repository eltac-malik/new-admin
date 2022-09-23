import React,{useState,useEffect} from "react";
import "assets/css/Product.css";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Formik, Form, Field } from "formik";

function AddProduct() {
    const [first,setFirst] = useState('')
    const [second,setSecond] = useState('')
    const [brands,setBrands] = useState('')
    const [models,setModel] = useState('')
    const [categories,setCategories] = useState('')
    const [oneBrands,setOneBrands] = useState('')
    const [oneModel,setOneModel] = useState('')
    const [oneCategory,setOneCategory] = useState('')
    const navigate = useNavigate()
    
    useEffect(()=>
    {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Models/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => {
                setModel(resp.data)
                setOneModel(resp.data[0].id)
            });
    },[])
       
    useEffect(()=>
    {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Categories/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => setCategories(resp.data));
    },[])
       
    useEffect(()=>
    {
        let x = JSON.parse(localStorage.getItem("Atoken"));
        axios
            .get("http://ejtacmalik-001-site1.btempurl.com/api/admin/Brands/getall", {
                headers: {
                    Authorization: "Bearer " + x,
                },
            })
            .then((resp) => setBrands(resp.data));
    },[])

    useEffect(() => {
        console.log(oneModel);
    }, [oneModel])


    
  return (
    <div className="add-prod">
      <Formik
      initialValues={{
          name:"",
          description:"",
          price:"",
          count:"",
          discount:"",
          code:""
      }}
      onSubmit={(val)=>
    {
        console.log(oneModel);
        let formdata = new FormData()
        console.log(val.price)
        formdata.append("Name",val.name);
        formdata.append("Description",val.description)
        formdata.append("Price",val.price)
        formdata.append("DiscountPrice",val.discount)
        formdata.append("FirstFile",first)
        formdata.append("Count",val.count)
        formdata.append("SecondFile",second)
        formdata.append("Code",val.code)
        formdata.append("BrandId",oneBrands)
        formdata.append("ModelId",oneModel)
        formdata.append("CategoryId",oneCategory)

        let token = JSON.parse(localStorage.getItem("Atoken"));


        let url = "http://ejtacmalik-001-site1.btempurl.com/api/admin/Products"
        console.log('salam');
       fetch(url, {
           method: 'post',
           headers: {
               "Authorization": "Bearer " + token,
           },
           body: formdata,
       })
           .then(resp =>
            {
                if (resp.status===201)
                {
                    navigate('/products')    
                }
            }
            ).catch(err=> alert("Melumatlar yalnisdir"))

    }}
      >
        <Form className="prod-form">
          <div className="prod-div">
            <label htmlFor="name">Name</label>
            <Field className="prod-inp" placeholder="Name" name="name" />
          </div>
          <div className="prod-div">
            <label htmlFor="name">Description</label>
            <Field
              className="prod-inp"
              as="textarea"
              placeholder="Name"
              name="description"
            />
          </div>
          <div className="prod-div">
            <label htmlFor="name">Price</label>
            <Field className="prod-inp" placeholder="Name" name="price" />
          </div>
          <div className="prod-div">
            <label htmlFor="name">Count</label>
            <Field className="prod-inp" placeholder="Name" name="count" />
          </div>
          <div className="prod-div">
            <label htmlFor="name">Discount Price</label>
            <Field className="prod-inp" placeholder="Name" name="discount" />
          </div>
          <div className="prod-div">
            <label htmlFor="name">Code</label>
            <Field className="prod-inp" placeholder="Name" name="code" />
          </div>
          <div className="prod-div">
            <label htmlFor="name">First image</label>
            
          <div className="select-file">
            <i className="bi bi-link-45deg"></i>
            <input
              onChange={(e) => setFirst(e.target.files[0])}
              name="image"
              type="file"
              className="custom-file-input"
              accept="image/jpeg"
              id="main"
            />
          </div>
          </div>

          
          <div className="prod-div">
            <label htmlFor="name">Second image</label>
            
          <div className="select-file">
            <i className="bi bi-link-45deg"></i>
            <input
              onChange={(e) => setSecond(e.target.files[0])}
              name="image"
              type="file"
              className="custom-file-input"
              accept="image/jpeg"
              id="main"
            />
          </div>
          </div>

         
         
          <div className="prod-div">
            <label htmlFor="name">Brands</label>
           <select onChange={e=> setOneBrands(e.target.value)} className="prod-inp">
               {
                   brands&&brands.map(e=>
                    {
                        return(
                            <option value={e.id}>{e.name}</option>
                        )
                    })
               }
           </select>
          </div>



          <div className="prod-div">
            <label htmlFor="name">Model</label>
           <select onChange={e=> setOneModel(e.target.value)} className="prod-inp">
               {
                   models&&models.map(e=>
                    {
                        return(
                            <option value={e.id}>{e.name}</option>
                        )
                    })
               }
           </select>
          </div>

          <div className="prod-div">
            <label htmlFor="name">Category</label>
           <select onChange={e=> setOneCategory(e.target.value)} className="prod-inp">
               {
                   categories&&categories.filter(e=> e.isDeleted !== true).map(e=>
                    {
                        return(
                            <option value={e.id}>{e.name}</option>
                        )
                    })
               }
           </select>
          </div>
               
          <div className="prod-div">
              <input className='prod-inp prod-btn' type="submit"/>
          </div>
          <p onClick={()=>navigate('/products')} className='prod-back'>Go back</p>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProduct;
