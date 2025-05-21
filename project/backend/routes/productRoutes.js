// routes/productRoutes.js
const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const router = express.Router();

// Use memory storage instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    // Convert buffer to base64
    const modifiedProducts = products.map((product) => {
      const imageBase64 = product.image?.data?.toString("base64");
      return {
        ...product._doc,
        image: imageBase64
          ? `data:${product.image.contentType};base64,${imageBase64}`
          : null,
      };
    });

    res.json(modifiedProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const imageBase64 = product.image?.data?.toString("base64");

    res.json({
      ...product._doc,
      image: imageBase64
        ? `data:${product.image.contentType};base64,${imageBase64}`
        : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Invalid product ID" });
  }
});

// Create a new product with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      productType,
      videoLink,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price: parseFloat(price),
      discountPrice: parseFloat(discountPrice || 0),
      stock: parseInt(stock || 0),
      productType: productType || "",
      videoLink: videoLink || "",
      rating: 0,
      reviews: [],
    });

    if (req.file) {
      newProduct.image.data = req.file.buffer;
      newProduct.image.contentType = req.file.mimetype;
    }

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ error: "Failed to create product" });
  }
});

// Update a product by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      productType,
      videoLink,
    } = req.body;

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ? parseFloat(price) : product.price;
    product.discountPrice = discountPrice
      ? parseFloat(discountPrice)
      : product.discountPrice;
    product.stock = stock ? parseInt(stock) : product.stock;
    product.productType = productType ?? product.productType;
    product.videoLink = videoLink ?? product.videoLink;

    if (req.file) {
      product.image.data = req.file.buffer;
      product.image.contentType = req.file.mimetype;
    }

    await product.save();
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ error: "Failed to update product" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Submit a review
router.post("/:id/reviews", async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const newReview = { user: "Guest", rating, comment };
    product.reviews.push(newReview);
    await product.save();

    res
      .status(201)
      .json({ message: "Review added successfully", reviews: product.reviews });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

// Get all reviews for a product
router.get("/:id/reviews", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product.reviews);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reviews" });
  }
});

module.exports = router;



























// const express = require("express");
// const Product = require("../models/Product");
// const router = express.Router();

// // Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// // Get a product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ error: "Product not found" });
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: "Invalid product ID" });
//   }
// });

// // Add a new product
// router.post("/", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to create product" });
//   }
// });

// // Submit a review for a product
// router.post("/:id/reviews", async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     const newReview = { user: "Guest", rating, comment, date: new Date() };
//     product.reviews.push(newReview); // Push the new review into the product's reviews array
//     await product.save();

//     res.status(201).json({ message: "Review added successfully", reviews: product.reviews });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to submit review" });
//   }
// });

// // Get all reviews for a product
// router.get("/:id/reviews", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     res.json(product.reviews);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching reviews" });
//   }
// });

// module.exports = router;
