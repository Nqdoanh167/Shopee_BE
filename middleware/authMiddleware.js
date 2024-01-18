/** @format */

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const STATUS_CODE = require('../constants/httpResponseCode');
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
dotenv.config();
const authMiddleWare = (req, res, next) => {
   const bearToken = req.headers?.authorization;
   if (!bearToken) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         error: true,
         message: HTTP_MESSAGE.TOKEN_IS_REQUIRE,
      });
   }
   const token = bearToken?.split(' ')[1];
   try {
      jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
         if (err) {
            return res.status(STATUS_CODE.NOT_FOUNDED).json({
               error: true,
               message: HTTP_MESSAGE.AUTHENTICATION,
            });
         }
         if (user?.isAdmin) {
            next();
         } else {
            return res.status(STATUS_CODE.NOT_FOUNDED).json({
               error: true,
               message: HTTP_MESSAGE.AUTHENTICATION,
            });
         }
      });
   } catch (error) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         error: true,
         message: error.message,
      });
   }
};
const authUserMiddleWare = (req, res, next) => {
   const bearToken = req.headers?.authorization;
   if (!bearToken) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         error: true,
         message: 'Vui lòng truyền token',
      });
   }
   const token = bearToken?.split(' ')[1];
   const userId = req.params.id;
   try {
      jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
         if (err) {
            return res.status(STATUS_CODE.NOT_FOUNDED).json({
               error: true,
               message: HTTP_MESSAGE.AUTHENTICATION,
            });
         }
         if (user?.isAdmin || user?.id === userId) {
            next();
         } else {
            return res.status(STATUS_CODE.NOT_FOUNDED).json({
               error: true,
               message: HTTP_MESSAGE.AUTHENTICATION,
            });
         }
      });
   } catch (error) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         error: true,
         message: error.message,
      });
   }
};
module.exports = {
   authMiddleWare,
   authUserMiddleWare,
};
