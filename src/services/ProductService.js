/** @format */
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const Product = require('../models/ProductModel');
const ProductRepo = require('../repositories/ProductRepo');
const createProduct = async (data, image) => {
   const {name, category, price, countInStock, description, discount} = data;
   if (!name || !category || !price || !countInStock || !image) {
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
const updateProduct = async (id, data, avatar) => {
   const product = await ProductRepo.getProductById(id);
   if (!product) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_PRODUCT,
      };
   }
   const newProduct = await ProductRepo.updateProduct(
      {_id: id},
      {
         ...data,
         avatar,
      },
      {new: true},
   );
   if (newProduct) {
      return {
         message: HTTP_MESSAGE.UPDATE_PRODUCT_SUCCESS,
         data: newProduct,
      };
   }
   return {
      error: true,
      code: STATUS_CODE.BAD_REQUEST,
      message: HTTP_MESSAGE.ERROR,
   };
};
const deleteProduct = async (id) => {
   const product = await ProductRepo.getProductById(id);

   if (!product) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_PRODUCT,
      };
   }
   await ProductRepo.deleteProduct({_id: id});
   return {
      message: HTTP_MESSAGE.DELETE_PRODUCT_SUCCESS,
   };
};
const deleteMany = async (ids) => {
   await ProductRepo.deleteManyProduct({_id: ids});
   return {
      message: HTTP_MESSAGE.DELETE_PRODUCT_SUCCESS,
   };
};
const getDetailProduct = async (id) => {
   const product = await ProductRepo.getProductById(id);
   if (!product) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_PRODUCT,
      };
   }
   return {
      message: HTTP_MESSAGE.GET_PRODUCT_SUCCESS,
      data: product,
   };
};
const getAllProduct = async (filter) => {
   if (filter) {
      const listProduct = await ProductRepo.getAllByCondition({category: filter});
      return {
         message: HTTP_MESSAGE.GET_ALL_PRODUCT_SUCCESS,
         data: listProduct,
      };
   }
   const listProduct = await ProductRepo.getAllByCondition();
   return {
      message: HTTP_MESSAGE.GET_ALL_PRODUCT_SUCCESS,
      data: listProduct,
   };
};
const getAllCategory = async () => {
   const listCategoryProduct = await Product.distinct('category');
   return {
      message: HTTP_MESSAGE.GET_ALL_CATEGORY_PRODUCT_SUCCESS,
      data: listCategoryProduct,
   };
};
const ProductService = {
   createProduct,
   updateProduct,
   deleteProduct,
   getDetailProduct,
   getAllProduct,
   deleteMany,
   getAllCategory,
};
module.exports = ProductService;
