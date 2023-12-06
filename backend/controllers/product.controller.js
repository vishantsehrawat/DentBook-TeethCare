// productController.js
const { ProductModel } = require("../models/product.model");

const createProduct = async (req, res) => {
  const productData = req.body;

  try {
    const product = new ProductModel(productData);
    await product.save();
    return res
      .status(200)
      .json({ message: "Product added successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Cannot add new product",
      success: false,
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({ product, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await ProductModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product updated successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const products = await ProductModel.find({ category: categoryName });
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};



module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategory,
  getProductsByManufacturer,
  searchProducts,
  getFeaturedProducts,
  getRelatedProducts,
  addProductReview,
  likeProduct,
  shareProduct,
};
