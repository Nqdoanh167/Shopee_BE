/** @format */

const Product = require('../models/ProductModel');

const getProductById = async (id) => {
   return await Product.findById(id);
};
const getAllByCondition = async (filter = {}) => {
   return await Product.find(filter);
};
const getProductByCondition = async (filter = {}) => {
   return await Product.findOne(filter);
};
const createProduct = async (data) => {
   return await Product.create(data);
};

const deleteProduct = async (filter = {}) => {
   return await Product.deleteOne(filter);
};

const deleteManyProduct = async (filter = {}) => {
   return await Product.deleteMany(filter);
};
const updateProduct = async (filter, data, options) => {
   return await Product.findOneAndUpdate(filter, data, options);
};

const ProductRepo = {
   getProductById,
   getProductByCondition,
   getAllByCondition,
   createProduct,
   updateProduct,
   deleteManyProduct,
   deleteProduct,
};
module.exports = ProductRepo;
