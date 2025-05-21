// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // images: {
  //   data: Buffer,
  //   contentType: String,
  // },
  images: [String], 
  description: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  productType: { type: String },
  videoLink: { type: String },
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);









// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   discountPrice: Number,
//   stock: Number,
//   images: [String], // Array of image URLs
//   reviews: [
//     {
//       user: String,
//       rating: Number,
//       comment: String,
//       date: { type: Date, default: Date.now },
//     },
//   ],
// });

// module.exports = mongoose.model("Product", productSchema);
