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
} = require("../controllers/product.controller");

productRouter.post("/create", createProduct);

productRouter.get("/:id", getProductById);

productRouter.patch("/:id", updateProduct);

productRouter.delete("/:id", deleteProduct);

productRouter.get("/", getAllProducts);

productRouter.get("/category/:categoryName", getProductsByCategory);

productRouter.get("/manufacturer/:manufacturerName", getProductsByManufacturer);

productRouter.get("/search", searchProducts);

productRouter.get("/featured", getFeaturedProducts);

productRouter.get("/related/:id", getRelatedProducts);

productRouter.post("/:id/reviews", addProductReview);

productRouter.post("/:id/like", likeProduct);

productRouter.post("/:id/share", shareProduct);

module.exports = { productRouter };
