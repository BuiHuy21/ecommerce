const Category = require("../models/categoryModel");
const Products = require("../models/productModel");
const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if role===1 admin
      //admin co quyen them sua xoa category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res
          .status(400)
          .json({ msg: "Đã tồn tại ,vui lòng thử lại tên khác" });

      const newCategory = new Category({ name });
      await newCategory.save();
      res.json({ msg: "Tạo thành công" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id });
      if (products)
        return res
          .status(400)
          .json({ msg: "Hãy xóa tất cả sản phẩm trước khi danh mục" });
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
