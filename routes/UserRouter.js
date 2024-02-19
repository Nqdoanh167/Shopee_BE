/** @format */

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const multerUtil = require('../util/multer.js');
const {authUserMiddleWare, authMiddleWare} = require('../middleware/authMiddleware.js');
router.post('/', UserController.Register);
router.get('/register-confirm', UserController.Confirm);
router.post('/login', UserController.Login);
router.put('/update/:id', authUserMiddleWare, multerUtil.upload.single('avatar'), UserController.UpdateUser);
router.put('/update-status/:id', authMiddleWare, UserController.UpdateStatusUser);
router.delete('/delete/:id', authMiddleWare, UserController.DeleteUser);
router.get('/get-all', authMiddleWare, UserController.getAllUser);
router.get('/get-detail/:id', authUserMiddleWare, UserController.getDetailUser);
router.post('/delete-many', authMiddleWare, UserController.deleteMany);
module.exports = router;
