import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import MyAccount from "./pages/my_account";
import Orders from "./pages/my_account/orders";
import OrderDetails from "./pages/my_account/orderDetails";
import Wishlist from "./pages/my_account/wishList";
import PersonalInfo from "./pages/my_account/personalInfo";
import Adresses from "./pages/my_account/adresses";
import AddAddress from "./pages/my_account/addAddress";
import EditAddress from "./pages/my_account/editAddress";
import PaymentMethods from "./pages/my_account/patmentMethods";
import AddPayment from "./pages/my_account/addPayment";
import EditPayment from "./pages/my_account/editPayment";
import Checkout from "./pages/checkout/checkoutPage";
import PaymentIndent from "./pages/checkout/checkoutPage/PaymentIndent";
import Login from "./pages/user/Login";
function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/myaccount/orders">My Account</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/payment-indent">PaymentIndent</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home page </h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="myaccount" element={<MyAccount />}>
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="personalinfo" element={<PersonalInfo />} />
          <Route path="adresses" element={<Adresses />} />
          <Route path="adresses/add" element={<AddAddress />} />
          <Route path="adresses/edit/:id" element={<EditAddress />} />
          <Route path="payment" element={<PaymentMethods />} />
          <Route path="payment/add" element={<AddPayment />} />
          <Route path="payment/edit/:id" element={<EditPayment />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-indent" element={<PaymentIndent />} />
      </Routes>
    </>
  );
}

export default App;
