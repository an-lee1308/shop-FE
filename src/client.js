import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Modals from "./components/Modals/modals";
import Footer from "./components/Footer/Footer";
import Products from "./pages/Products/Products";
import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ErrorPage from "./pages/ErrorPage/Error";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import CheckoutPage from "./pages/Checkout/Checkout";
import OrderPage from "./pages/Order/Order";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import "antd/dist/antd.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Client() {
  const [Render, setRender] = useState(false);
  function renderPage() {
    setRender(!Render);
  }
  return (
    <div className="App">
      <Header></Header>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/Products/:category" component={Products}></Route>
        <Route path="/DetailProduct/:id" component={DetailProduct}></Route>
        <Route path="/Cart" component={Cart}></Route>
        <Route path="/Forgot/:id" component={ForgotPassword} />
        <Route path="/user/order" component={OrderPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/user/profile">
          <Profile renderPage={renderPage} />
        </Route>
        <Route component={ErrorPage} />
      </Switch>
      <Footer></Footer>
      <Modals></Modals>
      <ToastContainer />
    </div>
  );
}

export default Client;
