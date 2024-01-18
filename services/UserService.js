/** @format */

const HTTP_MESSAGE = require('../constants/httpErrorMessage');
const STATUS_CODE = require('../constants/httpResponseCode');
const UserRepo = require('../repositories/UserRepo');
const EmailService = require('../services/EmailService');
const JwtService = require('../services/JwtService');
const Util = require('../util/util');
/** @format */
const createUser = async (data) => {
   const {email, password} = data;
   if (!email || !password) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.THE_INPUT_IS_REQUIRE,
      };
   }

   const user = await UserRepo.getUserByCondition({
      email,
      status: 2,
   });

   if (user) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.EXISTED_USER,
      };
   }

   const oldUser = await UserRepo.getUserByCondition({
      email: email,
      status: 1,
   });

   if (oldUser) {
      await UserRepo.deleteU({
         email: email,
      });
   }

   const newUser = await UserRepo.createUser({
      email,
      password: Util.hashPw(password),
      status: 1,
   });

   const access_token = await JwtService.genneralAccessToken({
      id: newUser._id,
   });

   await EmailService.SendMail({
      to: email,
      subject: 'Xác thực tài khoản',
      text: `http://localhost:8080/api/user/register-confirm?access_token=${access_token}`,
   });
   return {
      message: HTTP_MESSAGE.SUCCESS,
      data: access_token,
   };
};
const signupConfirm = async (data) => {
   const {access_token} = data;
   const {id} = JwtService.decodeAccessToken(access_token);
   const user = await UserRepo.getUserByCondition({
      status: 1,
      _id: id,
   });
   if (user) {
      await UserRepo.updateUserById(id, {status: 2});
      return {
         message: HTTP_MESSAGE.SUCCESS,
      };
   } else {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.ERROR,
      };
   }
};
const Login = async (data) => {
   const {email, password} = data;
   if (!email || !password) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.THE_INPUT_IS_REQUIRE,
      };
   }
   if (!Util.isCheckEmail(email)) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.EMAIL_NOT_VERIFY,
      };
   }
   const user = await UserRepo.getUserByCondition({
      status: 2,
      email,
   });
   if (!user) {
      return {
         error: true,
         code: STATUS_CODE.NOT_FOUNDED,
         message: HTTP_MESSAGE.NOT_EXISTED_USER,
      };
   }
   if (!Util.isCheckPassword(password, user.password)) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.PASSWORD_NOT_MATCH,
      };
   }
   const access_token = await JwtService.genneralAccessToken({
      id: user.id,
      isAdmin: user.isAdmin,
   });
   const refresh_token = await JwtService.genneralRefreshToken({
      id: user.id,
      isAdmin: user.isAdmin,
   });
   return {
      message: HTTP_MESSAGE.LOGIN_SUCCESS,
      access_token: access_token,
      refresh_token: refresh_token,
      data: user,
   };
};
const UpdateUser = async (id, data, avatar) => {
   const user = await UserRepo.getUserById(id);
   const {name, dob, address, phone, password} = data;
   if (!user) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_USER,
      };
   }
   const updateUser = await UserRepo.updateUserById(
      id,
      {
         name,
         dob,
         address,
         phone,
         password: Util.hashPw(password),
         avatar,
      },
      {new: true},
   );
   return {
      message: HTTP_MESSAGE.UPDATE_USER_SUCCESS,
      data: updateUser,
   };
};
const UpdateStatusUser = async (id, data) => {
   const user = await UserRepo.getUserById(id);
   const {status} = data;
   if (!user) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_USER,
      };
   }
   const updateUser = await UserRepo.updateUser({_id: id}, {status}, {new: true});

   return {
      message: HTTP_MESSAGE.UPDATE_USER_SUCCESS,
      data: updateUser,
   };
};
const DeleteUser = async (id) => {
   const user = await UserRepo.getUserById(id);

   if (!user) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_USER,
      };
   }

   await UserRepo.deleteUser({_id: ids});
   return {
      message: HTTP_MESSAGE.DELETE_USER_SUCCESS,
   };
};
const getAllUser = async () => {
   const listUser = await UserRepo.getAllByCondition();
   return {
      message: HTTP_MESSAGE.GET_ALL_USER_SUCCESS,
      data: listUser,
   };
};
const getDetailUser = async (id) => {
   const user = await UserRepo.getUserById(id);
   if (!user) {
      return {
         error: true,
         code: STATUS_CODE.BAD_REQUEST,
         message: HTTP_MESSAGE.NOT_EXISTED_USER,
      };
   }
   return {
      message: HTTP_MESSAGE.GET_USER_SUCCESS,
      data: user,
   };
};
const deleteMany = async (ids) => {
   await UserRepo.deleteManyUser({_id: ids});
   return {
      message: HTTP_MESSAGE.DELETE_USER_SUCCESS,
   };
};
const authService = {
   createUser,
   signupConfirm,
   Login,
   UpdateUser,
   DeleteUser,
   UpdateStatusUser,
   getAllUser,
   getDetailUser,
   deleteMany,
};
module.exports = authService;
