/** @format */

const OrderProduct = require('../models/OrderProductModel');

const getOrderProductById = async (id) => {
   return await OrderProduct.findById(id);
};
const getAllByCondition = async (filter = {}) => {
   return await OrderProduct.find(filter);
};
const getOrderProductByCondition = async (filter = {}) => {
   return await OrderProduct.findOne(filter);
};
const createOrderProduct = async (data) => {
   return await OrderProduct.create(data);
};

const deleteOrderProduct = async (filter = {}) => {
   return await OrderProduct.deleteOne(filter);
};

const deleteManyOrderProduct = async (filter = {}) => {
   return await OrderProduct.deleteMany(filter);
};
const updateOrderProduct = async (filter, data, options) => {
   return await OrderProduct.updateOne(filter, data, options);
};

const OrderProductRepo = {
   getOrderProductById,
   getOrderProductByCondition,
   getAllByCondition,
   createOrderProduct,
   updateOrderProduct,
   deleteManyOrderProduct,
   deleteOrderProduct,
};
module.exports = OrderProductRepo;
