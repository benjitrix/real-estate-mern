
import './css/App.css';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Login from './Components/Login'
import QueryEstates from './Pages/QueryEstates'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SingleEstate from './Components/SingleEstate'
import RegisterEstate from './Components/RegisterEstate';
import UpdateEstate from './Components/UpdateEstate';
import DeleteEstate from './Components/DeleteEstate'
import UserEstates from './Components/UserEstates'
import Admin from './Components/Admin'
import QueryUserEstates from './Pages/QueryUserEstates';
import Cart from './Components/Cart';
import CheckoutSuccess from './Components/CheckoutSuccess'

function App() {
  
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route exact path='/' element={<QueryEstates />} />
        <Route path='/register' caseSensitive={true} element={<Register />} />
        <Route path='/login' caseSensitive={true} element={<Login />} />
        <Route path='/single-estate/:id' caseSensitive={true} element={<SingleEstate />} />
        <Route path='/register-estate' caseSensitive={true} element={<RegisterEstate />} />
        <Route path='/update-estate/:id' caseSensitive={true} element={<UpdateEstate />} />
        <Route path='/delete-estate/:id' caseSensitive={true} element={<DeleteEstate />} />
        <Route path='/user-estates' caseSensitive={true} element={<UserEstates />} />
        <Route path='/query-user-estates' caseSensitive={true} element={<QueryUserEstates />} />
        <Route path='/admin' caseSensitive={true} element={<Admin />} />
        <Route path='/cart' caseSensitive={true} element={<Cart />} />
        <Route path='/checkout-success' caseSensitive={true} element={<CheckoutSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
