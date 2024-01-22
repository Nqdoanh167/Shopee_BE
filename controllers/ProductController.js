/** @format */
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
   try {
      const data = await ProductService.createProduct(req.body, req.file?.filename);
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
const updateProduct = async (req, res) => {
   try {
      const idProduct = req.params.id;
      if (!idProduct) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await ProductService.updateProduct(idProduct, req.body, req.file?.filename);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.SUCCESS).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const deleteProduct = async (req, res) => {
   try {
      const idProduct = req.params.id;
      if (!idProduct) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await ProductService.deleteProduct(idProduct);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.SUCCESS).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const deleteMany = async (req, res) => {
   try {
      const ids = req.body.ids;
      if (!ids) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.IDS_IS_REQUIRE,
         });
      }
      const data = await ProductService.deleteMany(ids);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.SUCCESS).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const getDetailProduct = async (req, res) => {
   try {
      const idProduct = req.params.id;
      if (!idProduct) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await ProductService.getDetailProduct(idProduct);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.SUCCESS).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const getAllProduct = async (req, res) => {
   try {
      const data = await ProductService.getAllProduct();
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.SUCCESS).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const getAllCategory = async (req, res) => {
   try {
      const data = await ProductService.getAllCategory();
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.SUCCESS).json(data);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
module.exports = {
   createProduct,
   updateProduct,
   deleteProduct,
   getDetailProduct,
   getAllProduct,
   deleteMany,
   getAllCategory,
};
