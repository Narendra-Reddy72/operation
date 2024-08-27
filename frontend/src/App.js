import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import EditProduct from './components/products/EditProduct';
import Dashboard from './components/dashboard/Dashboard';
import ProductForm from './components/products/ProductForm';
import CreateOrder from './components/orders/CreateOrder';
import OrderPage from './pages/OrderPage';
import EditOrder from './components/orders/EditOrder';
import SupplierForm from './components/suppliers/SupplierForm';
import SupplierPage from './pages/SuppliersPage';
import EditSupplier from './components/suppliers/EditSupplier';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='' element = {<Navbar/>}/>
          <Route path='/'element = {<HomePage/>}/>
          <Route path='/signup' element = {<SignupPage/>}/>
          <Route path='/login' element = {<LoginPage/>}/>
          <Route path='/products'element={<ProductPage/>}/>
          <Route path='/orders'element={<OrderPage/>}/>
          <Route path='/editproduct/:id' element={<EditProduct/>}/>
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/create-order" element={<CreateOrder/>} />
          <Route path="/editorder/:id" element={<EditOrder/>} />
          <Route path="/create-supplier" element={<SupplierForm/>} />
          <Route path="/suppliers" element={<SupplierPage/>} />
          <Route path="/editsupplier/:id" element={<EditSupplier/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
