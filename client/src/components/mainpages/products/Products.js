import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import { Skeleton } from "antd";
import axios from "axios";
import Filter from "./Filter";
import LoadMore from "./LoadMore";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;
  const [isLogged] = state.userAPI.isLogged;
  const addCart = state.userAPI.addCart;
  const [ischeck, setIsCheck] = useState(false);

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const deleteImg = await axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );

      const deleteProduct = await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: token },
      });

      await deleteImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !product.checked;
    });

    setProducts([...products]);
    setIsCheck(!ischeck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Skeleton active />
      </div>
    );

  return (
    <>
      <Filter />
      {isAdmin && (
        <div className="delete_all">
          <span>Select All</span>
          <input type="checkbox" checked={ischeck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete all</button>
        </div>
      )}
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              products={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
              isLogged={isLogged}
              addCart={addCart}
            />
          );
        })}
      </div>
      <LoadMore />
      {products.length === 0 && <Skeleton active />}
    </>
  );
}

export default Products;
