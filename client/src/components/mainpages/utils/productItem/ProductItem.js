import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

function ProductItem({
  products,
  isAdmin,
  deleteProduct,
  handleCheck,
  isLogged,
  addCart,
}) {
  return (
    <div className="product_cart">
      {isAdmin && (
        <input
          type="checkbox"
          checked={products.checked}
          onChange={() => {
            handleCheck(products._id);
          }}
        />
      )}
      <Link to={`/detail/${products._id}`}>
        <img src={products.images.url} alt="" />
      </Link>

      <div className="product_box">
        <h2 title={products.title}>{products.title}</h2>
        <span>${products.price}</span>
        <p>{products.description}</p>
      </div>

      <div className="row_btn">
        {isAdmin ? (
          <>
            <Button type="danger">
              <Link
                id="btn_buy"
                to="#!"
                onClick={() =>
                  deleteProduct(products._id, products.images.public_id)
                }
              >
                Delete
              </Link>
            </Button>
            <Button type="primary">
              <Link id="btn_view" to={`/edit_product/${products._id}`}>
                Edit
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button type="default">
              <Link
                id="btn_buy"
                to={isLogged ? "/cart" : "/login"}
                onClick={() => addCart(products)}
              >
                Add
              </Link>
            </Button>

            <Button type="link">
              <Link id="btn_view" to={`/detail/${products._id}`}>
                Chi tiết
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
