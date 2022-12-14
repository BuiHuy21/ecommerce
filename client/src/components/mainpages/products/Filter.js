import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function Filter() {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filter: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value=""> All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Enter your search..."
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row">
        <span>Sort By: </span>
        <select
          name="category"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="sort=-price"> Price: Hight - Low</option>
          <option value=""> Newest</option>
          <option value="sort=price"> Price: Low - Height</option>
          <option value="sort=oldest"> Oldest</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
