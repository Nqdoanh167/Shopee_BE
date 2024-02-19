/** @format */

const express = require('express');
const router = express.Router();
const {authUserMiddleWare, authMiddleWare} = require('../middleware/authMiddleware.js');
const ProductController = require('../controllers/ProductController.js');
const multerUtil = require('../util/multer.js');
router.post('/', authMiddleWare, multerUtil.upload.single('image'), ProductController.createProduct);
router.put('/update/:id', authMiddleWare, multerUtil.upload.single('image'), ProductController.updateProduct);
router.delete('/delete/:id', authMiddleWare, ProductController.deleteProduct);
router.get('/get-detail/:id', ProductController.getDetailProduct);
router.get('/get-all', ProductController.getAllProduct);
router.post('/delete-many', authMiddleWare, ProductController.deleteMany);
router.get('/get-all-category', ProductController.getAllCategory);
module.exports = router;
