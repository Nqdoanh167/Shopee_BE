/** @format */

const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController.js');
const {authUserMiddleWare, authMiddleWare} = require('../middleware/authMiddleware.js');
router.post('/:id', authUserMiddleWare, OrderController.createOrder);
router.get('/get-detail/:id', OrderController.getDetailOrder);
// router.delete('/cancel/:id', authUserMiddleWare, OrderController.cancelOrderDetail);
module.exports = router;
