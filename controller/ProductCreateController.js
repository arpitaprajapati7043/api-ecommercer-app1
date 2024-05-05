const express = require('express');
const fs = require('fs');
const path = require('path');
const ProductModel = require('../models/productModel');

// exports.createProduct=async (req, res) => {
//     try {
//         // Read the db.json file
//         const filePath = path.join(__dirname, '../db.json');
//         const data = fs.readFileSync(filePath, 'utf-8');
//         const jsonData = JSON.parse(data);

//         // Delete existing products
//         await ProductModel.deleteMany();

//         // Create new products
//         await ProductModel.create(jsonData.products);

//         // Respond with a success message
//         res.status(201).json({ message: "Products created successfully" });
//     } catch (error) {
//         // If an error occurs, respond with the error message
//         res.status(500).json({ message: error.message });
//     }
// }

exports.createProduct = async (req, res) => {
    try {
        // Read the db.json file
        const filePath = path.join(__dirname, '../db.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(data);

        // Delete existing products
        await ProductModel.deleteMany();

        // Create new products
        await ProductModel.create(jsonData.products);

        // Fetch all products after adding the new ones
        const updatedProducts = await ProductModel.find({});

        // Respond with the updated list of products
        res.status(201).json({ message: "Products created successfully", products: updatedProducts });
    } catch (error) {
        // If an error occurs, respond with the error message
        res.status(500).json({ message: error.message });
    }
}

