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

const getProductsByManufacturer = async (req, res) => {
  const { manufacturerName } = req.params;

  try {
    const products = await ProductModel.find({
      manufacturer: manufacturerName,
    });
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.query;

  try {
    const products = await ProductModel.find({
      $text: { $search: query },
    });
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ isFeatured: true });
    return res.status(200).json({ products, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getRelatedProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    const relatedProducts = await ProductModel.find({
      category: product.category,
      _id: { $ne: id },
    }).limit(5);

    return res.status(200).json({ relatedProducts, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const addProductReview = async (req, res) => {
  const { id } = req.params;
  const { userId, review, rating } = req.body;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    product.reviews.push({ userId, review, rating });
    product.ratings = (
      (product.ratings * (product.reviews.length - 1) + rating) /
      product.reviews.length
    ).toFixed(1);
    await product.save();

    return res.status(200).json({
      message: "Review added successfully",
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

const likeProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    product.likes += 1;
    await product.save();

    return res.status(200).json({
      message: "Product liked successfully",
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

const shareProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    product.shares += 1;
    await product.save();

    return res.status(200).json({
      message: "Product shared successfully",
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
