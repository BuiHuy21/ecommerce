import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Skeleton } from "antd";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "fakeshop",
  content: "san pham duoc yeu thich",
  category: "",
  _id: "",
};

function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [images, setimages] = useState(false);
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setOnEdit(true);
          setProduct(product);
          setimages(product.images);
        }
      });
    } else {
      setOnEdit(false);

      setProduct(initialState);
      setimages(false);
    }
  }, [params.id, products]);
  const styleUpload = {
    display: images ? "block" : "none",
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert(" ban khong phai la quan tri vien");
      const file = e.target.files[0];

      if (!file) return alert("khong co file anh");

      if (file.size > 1024 * 1024) return alert("Kich co anh qua lon");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("file anh khong dung dinh dang");

      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          Authorization: token,
          "content-type": "multipart/form-data",
        },
      });
      setLoading(false);
      setimages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!isAdmin) return alert("ban khong phai la admin");
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setimages(false);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert(" ban khong phai la admin");
      if (!images) return alert(" khong co anh ");
      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        setProduct(initialState);
        history("/");

        alert("sửa sản phẩm thành công");
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        alert("thêm sản phẩm thành công");
      }

      setimages(false);
      setCallback(!callback);
      setProduct(initialState);
      history("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Skeleton />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDelete}>X</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        <div className="row">
          <label htmlFor="Title">Title </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Price </label>
          <input
            type="number"
            name="price"
            required
            id="price"
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description </label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="content">content </label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="categories">Categories </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default CreateProduct;
