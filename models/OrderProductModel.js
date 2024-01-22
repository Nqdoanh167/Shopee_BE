/** @format */

const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema(
   {
      productId: {
         type: mongoose.Types.ObjectId,
         ref: 'products',
         require: true,
      },
      orderId: {
         type: mongoose.Types.ObjectId,
         ref: 'orders',
         require: true,
      },
      amount: {
         type: Number,
         require: true,
      },
      price: {
         type: Number,
         require: true,
      },
   },
   {
      timestamps: true,
   },
);
const OrderProduct = mongoose.model('OrderProduct', orderProductSchema);
module.exports = OrderProduct;
