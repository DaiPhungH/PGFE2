import './App.css';
import LoginComponent from './components/Auth';
import RegisterComponent from './components/Auth/RegisterComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Main from './components/Main/Main';
import Cart from './components/Cart/Cart';
import ShopPage from './components/ShopPage/ShopPage';
import DetailPage from './components/DeTail/DeTail';
import CheckoutPage from './components/CheckOut/CheckOut';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/shop" element={<ShopPage/>} />
        <Route path="/detail/:productId" element={<DetailPage/>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route
          path="blog/:id"
          element={<Detail />}
        /> */}
      </Routes>
    </Router>
  );
}

export default App;
