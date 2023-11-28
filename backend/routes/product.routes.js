const express = require("express");
const productRouter = express.Router();
const {
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
} = require("../controllers/productController");

productRouter.post("/", createProduct);

productRouter.get("/:id", getProductById);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);


module.exports = { productRouter };
