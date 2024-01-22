/** @format */

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
   {
      totalMoney: {type: Number, required: true},
      paymentMethod: {type: String, required: true},
      userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
      fullname: {type: String, required: true},
      address: {type: String, required: true},
      phone: {type: String, required: true},
      costShip: {type: Number, required: true},
      isPaid: {type: Boolean, default: false},
      paidAt: {type: Date},
      isDelivered: {type: Boolean, default: false},
      deliveredAt: {type: Date},
   },
   {
      timestamps: true,
   },
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
