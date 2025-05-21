const Product = require('../models/Product');

// Fetch all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Fetch a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, images, video, price, discountPrice, stock, description } = req.body;

    try {
        const newProduct = new Product({ name, images, video, price, discountPrice, stock, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
};
