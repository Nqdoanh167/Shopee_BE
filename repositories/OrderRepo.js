/** @format */

const Order = require('../models/OrderModel');

const getOrderById = async (id) => {
   return await Order.findById(id);
};
const getAllByCondition = async (filter = {}) => {
   return await Order.find(filter);
};
const getOrderByCondition = async (filter = {}) => {
   return await Order.findOne(filter);
};
const createOrder = async (data) => {
   return await Order.create(data);
};

const deleteOrder = async (filter = {}) => {
   return await Order.deleteOne(filter);
};

const deleteManyOrder = async (filter = {}) => {
   return await Order.deleteMany(filter);
};
const updateOrder = async (filter, data, options) => {
   return await Order.updateOne(filter, data, options);
};

const OrderRepo = {
   getOrderById,
   getOrderByCondition,
   getAllByCondition,
   createOrder,
   updateOrder,
   deleteManyOrder,
   deleteOrder,
};
module.exports = OrderRepo;
