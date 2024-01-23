/** @format */
const CONST_APP = require('../constants/constant');
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const ProductRepo = require('../repositories/ProductRepo');
const OrderRepo = require('../repositories/OrderRepo');
const OrderProductRepo = require('../repositories/OrderProductRepo');

const createOrder = async (data, userId) => {
   const {fullname, address, phone, paymentMethod, costShip, note, orderProducts} = data;
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

   const ids = orderProducts.map((p, index) => p.productId);
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
      orderProducts.some((p) => {
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
   let listOrderProduct = [...orderProducts];
   const check = await Promise.all(
      orderProducts.map(async (p) => {
         const product = await ProductRepo.updateProduct(
            {
               _id: p.productId,
               countInStock: {$gte: p.amount},
            },
            {
               $inc: {
                  countInStock: -p.amount,
                  selled: +p.amount,
               },
            },
            {new: true},
         );
         if (!product) {
            const sp = listOrderProduct.filter((item) => item.productId !== p.productId);
            listOrderProduct = [...sp];
            return {
               error: true,
               code: STATUS_CODE.BAD_REQUEST,
               message: `Sản phẩm với id ${p.productId} đã hết hàng`,
            };
         } else {
            return {
               code: STATUS_CODE.SUCCESS,
               message: HTTP_MESSAGE.SUCCESS,
            };
         }
      }),
   );
   if (listOrderProduct.length) {
      const newOrder = await OrderRepo.createOrder({
         totalMoney: listOrderProduct.reduce((prev, curr) => {
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
         listOrderProduct.map((p) =>
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
            data: newOrder,
         };
      }
   }
   return {
      error: true,
      code: STATUS_CODE.BAD_REQUEST,
      message: 'Hết hàng',
   };
};
const getDetailOrder = async (orderId) => {
   const order = await OrderRepo.getOrderById(orderId);
   const productOrder = await OrderProductRepo.getAllByCondition({orderId: orderId});
   const listProduct = await Promise.all(
      productOrder.map(async (p) => {
         const Product = await ProductRepo.getProductById(p.productId);
         const ProductOrder = {Product, price: p.price, amount: p.amount};
         return ProductOrder;
      }),
   );
   if (!order) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_ORDER,
      };
   }
   if (!productOrder) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_PRODUCT,
      };
   }

   return {
      message: HTTP_MESSAGE.GET_ORDER_SUCCESS,
      data: {
         order,
         listProduct,
      },
   };
};
const OrderService = {
   createOrder,
   getDetailOrder,
};
module.exports = OrderService;
