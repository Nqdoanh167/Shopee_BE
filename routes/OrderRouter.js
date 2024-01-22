/** @format */

const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController.js');
const {authUserMiddleWare, authMiddleWare} = require('../middleware/authMiddleware.js');
router.post('/', authUserMiddleWare, OrderController.createOrder);
module.exports = router;
