import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Footer from "../footer/Footer";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import DetailProduct from "./detailProduct/DetailProduct";
import Products from "./products/Products";
import NotFound from "./utils/NotFound/NotFound";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return (
    <Routes>
      <Route path="/" exact element={<Products />}></Route>
      <Route
        path="/login"
        element={isLogged ? <NotFound /> : <Login />}
      ></Route>
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      ></Route>
      <Route
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
      ></Route>
      <Route
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      ></Route>
      <Route
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      ></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/detail/:id" element={<DetailProduct />}></Route>
      <Route path="*" exact element={<NotFound />}></Route>
    </Routes>
  );
}

export default Pages;
