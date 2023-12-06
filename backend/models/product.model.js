const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Toothpaste",
        "Toothbrushes",
        "Mouthwash",
        "Dental Floss",
        "Teeth Whitening",
        "other"
      ],
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        review: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ingredients: {
      type: [String],
      required: true,
    },
    usageInfo: {
      type: String,
      required: true,
    },
    storageInfo: {
      type: String,
      required: true,
    },
    benefits: [String],
    warnings: [String],
    isPrescriptionRequired: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    suggestedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
