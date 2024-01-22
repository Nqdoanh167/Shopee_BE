/** @format */
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const ProductRepo = require('../repositories/ProductRepo');
const createOrder = async (data) => {
   const {fullname, address, phone, costShip, paymentMethod} = data;
   if (!fullname || !address || !phone || !costShip || !paymentMethod) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.THE_INPUT_IS_REQUIRE,
      };
   }

   const product = await ProductRepo.getProductByCondition({
      name: name,
   });

   if (product) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.EXISTED_PRODUCT,
      };
   }

   const newProduct = await ProductRepo.createProduct({
      name,
      image,
      category,
      price,
      countInStock,
      description,
      discount,
   });
   if (newProduct) {
      return {
         message: HTTP_MESSAGE.SUCCESS,
         data: newProduct,
      };
   }
   return {
      error: true,
      code: STATUS_CODE.BAD_REQUEST,
      message: HTTP_MESSAGE.ERROR,
   };
};

const OrderService = {
   createOrder,
};
module.exports = OrderService;
