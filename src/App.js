import {useEffect} from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import {Routes,Route,useLocation} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import {useDispatch} from 'react-redux'
import {setLog} from './redux/loginSlice'
import Sliders from './Pages/Slider'
import Users from 'Pages/Users/Users';
import Products from 'Pages/Products/Products'
import Brands from 'Pages/Brands/Brands';
import Category from  'Pages/Category/Categories'
import AddProd from 'Pages/Products/ProductModal/addProduct'
import Blog from 'Pages/Blogs/Blog'

function App() {

  const dispatch = useDispatch()

  useEffect(()=>
  {

    if (JSON.parse(localStorage.getItem("route")) === null)
    {
      localStorage.setItem("route",JSON.stringify(false))
      dispatch(setLog(JSON.parse(localStorage.getItem("route"))))
    }
    else
    {
      dispatch(setLog(JSON.parse(localStorage.getItem("route"))))
    }

  },[])

  let loc = useLocation();

  return (
    <div className="App">

      {loc.pathname !== "/"?<Nav/>:null} 
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route element={<ProtectedRoutes/>}>
          <Route path='/home' element={<Users/>}/>
          <Route path='/slider' element={<Sliders/>}/>
          <Route path='/brands' element={<Brands/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/addproducts' element={<AddProd/>}/>
          <Route path='/category' element={<Category/>}/>
          <Route path='/blog' element={<Blog/>}/>
          </Route>
        </Routes>
    
    </div>
  );
}

export default App;
