/** @format */
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
   const userId = req?.params?.id;
   if (!userId) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         message: HTTP_MESSAGE.ID_IS_REQUIRE,
      });
   }
   try {
      const data = await OrderService.createOrder(req.body, userId);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.CREATED).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const getDetailOrder = async (req, res) => {
   const orderId = req?.params?.id;
   if (!orderId) {
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         message: HTTP_MESSAGE.ID_IS_REQUIRE,
      });
   }
   try {
      const data = await OrderService.getDetailOrder(orderId);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.CREATED).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
module.exports = {
   createOrder,
   getDetailOrder,
};
