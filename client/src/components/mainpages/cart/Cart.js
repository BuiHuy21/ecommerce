import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
    //
  }, [cart]);

  const addToCart = async () => {
    await axios.patch(
      "/user/addCart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        // item.quantity === 1 ? item.quantity === 1 : (item.quantity -= 1);

        if (item.quantity === 1) {
          return item.quantity === 1;
        } else item.quantity -= 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Are you sure you want to remove")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };
  if (cart.length === 0)
    return (
      <h2
        style={{ textAlign: "center", lineHeight: "300px", minHeight: "500px" }}
      >
        Không có sản phẩm trong giỏ hàng
      </h2>
    );
  return (
    <div>
      {cart.map((product) => (
        <div className="detail" key={product._id}>
          <img src={product.images.url} alt="" />
          <div className="box_detail">
            <div className="row">
              <h2>{product.title}</h2>
            </div>
            <span>$ {product.price * product.quantity}</span>
            <p>{product.description}</p>
            <p>Sold: {product.sold}</p>
            <div className="amount">
              <button
                onClick={() => {
                  decrement(product._id);
                }}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => {
                  increment(product._id);
                }}
              >
                +
              </button>
            </div>
            <div className="delete">
              <button
                onClick={() => {
                  removeProduct(product._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3 style={{ color: "red" }}>Total : {total} VnĐ</h3>
      </div>
    </div>
  );
}

export default Cart;
