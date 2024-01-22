/** @format */
const CONST_APP = require('../constants/constant');
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const ProductRepo = require('../repositories/ProductRepo');
const OrderRepo = require('../repositories/OrderRepo');
const OrderProductRepo = require('../repositories/OrderProductRepo');

const createOrder = async (data, userId) => {
   const {fullname, address, phone, paymentMethod, costShip, note, orderProduct} = data;
   if (!fullname || !address || !phone || !paymentMethod || !costShip || !note) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.THE_INPUT_IS_REQUIRE,
      };
   }
   if (!CONST_APP.TypePaymentEnum[paymentMethod]) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: 'Type payment không đúng',
      };
   }

   const ids = orderProduct.map((p, index) => p.productId);
   const allProduct = await ProductRepo.getAllByCondition({
      _id: {$in: ids},
   });
   // const allProduct = await Promise.all(orderProduct.map((p, index) => ProductRepo.getProductById(p.productId)));

   if (allProduct.length !== ids.length) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: 'Truyền sai productId hoặc truyền giống nhau',
      };
   }
   if (
      orderProduct.some((p) => {
         const dbProduct = allProduct.find((db) => db._id.toString() == p.productId);
         return dbProduct.price != p.price;
      })
   ) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: 'Truyền sai giá',
      };
   }

   const newOrder = await OrderRepo.createOrder({
      totalMoney: orderProduct.reduce((prev, curr) => {
         prev = +curr.price * +curr.amount + prev;
         return prev;
      }, 0),
      paymentMethod,
      userId,
      fullname,
      address,
      phone,
      costShip,
      note,
   });
   const newOrderProduct = await Promise.all(
      orderProduct.map((p) =>
         OrderProductRepo.createOrderProduct({
            productId: p.productId,
            price: p.price,
            amount: p.amount,
            orderId: newOrder._id,
         }),
      ),
   );
   if (newOrder && newOrderProduct) {
      return {
         message: HTTP_MESSAGE.SUCCESS,
      };
   }
};

const OrderService = {
   createOrder,
};
module.exports = OrderService;
