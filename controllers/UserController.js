/** @format */
const PhoneConfirm = async (req, res) => {
   const {phone} = req.body;
};
const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const UserService = require('../services/UserService');
const Register = async (req, res) => {
   try {
      const data = await UserService.createUser(req.body);

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
const Confirm = async (req, res) => {
   try {
      const data = await UserService.signupConfirm(req.query);
      if (data?.error) {
         return res.status(data?.code).json(data?.message);
      }
      return res.status(STATUS_CODE.CREATED).json(data?.message);
   } catch (e) {
      return res.status(e?.status || STATUS_CODE.ERROR_SERVER).json({
         message: e,
      });
   }
};
const Login = async (req, res) => {
   try {
      const data = await UserService.Login(req.body);
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
const UpdateUser = async (req, res) => {
   try {
      const idUser = req.params.id;
      if (!idUser) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await UserService.UpdateUser(idUser, req.body, req.avatar);
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
const UpdateStatusUser = async (req, res) => {
   try {
      const idUser = req.params.id;
      if (!idUser) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await UserService.UpdateStatusUser(idUser, req.body);
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
const DeleteUser = async (req, res) => {
   try {
      const idUser = req.params.id;
      if (!idUser) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await UserService.DeleteUser(idUser);
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
const getAllUser = async (req, res) => {
   try {
      const data = await UserService.getAllUser();
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
const getDetailUser = async (req, res) => {
   try {
      const idUser = req.params.id;
      if (!idUser) {
         return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: HTTP_MESSAGE.ID_IS_REQUIRE,
         });
      }
      const data = await UserService.getDetailUser(idUser);
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
      const data = await UserService.deleteMany(ids);
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
   Register,
   Confirm,
   UpdateUser,
   Login,
   DeleteUser,
   UpdateStatusUser,
   getAllUser,
   getDetailUser,
   deleteMany,
};
