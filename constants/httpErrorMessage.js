/** @format */

const HTTP_MESSAGE = {
   SUCCESS: 'Thành công',
   ERROR: 'Thất bại',
   // body
   THE_INPUT_IS_REQUIRE: 'Nhập thiếu.',
   EMAIL_NOT_VERIFY: 'Email chưa đúng định dạng.',
   PASSWORD_NOT_VERIFY: 'password chưa đúng định dạng.',

   ID_IS_REQUIRE: 'Vui lòng truyền id',
   IDS_IS_REQUIRE: 'Vui lòng truyền ids',

   // user
   NOT_EXISTED_USER: 'Người dùng chưa tồn tại',
   EXISTED_USER: 'Người dùng đã tồn tại',
   PASSWORD_NOT_MATCH: 'Mật khẩu vào không đúng',
   LOGIN_SUCCESS: 'Đăng nhập thành công',
   UPDATE_USER_SUCCESS: 'Cập nhật người dùng thành công',
   DELETE_USER_SUCCESS: 'Xóa người dùng thành công',
   GET_ALL_USER_SUCCESS: 'Lấy tất cả thông tin người dùng thành công',
   GET_USER_SUCCESS: 'Lấy thông tin người dùng thành công',

   // product
   NOT_EXISTED_PRODUCT: 'Sản phẩm chưa tồn tại',
   EXISTED_PRODUCT: 'Sản phẩm đã tồn tại',
   UPDATE_PRODUCT_SUCCESS: 'Cập nhật sản phẩm thành công',
   DELETE_PRODUCT_SUCCESS: 'Xóa sản phẩm thành công',
   GET_ALL_PRODUCT_SUCCESS: 'Lấy tất cả thông tin sản phẩm thành công',
   GET_PRODUCT_SUCCESS: 'Lấy thông tin sản phẩm thành công',
   GET_ALL_CATEGORY_PRODUCT_SUCCESS: 'Lấy tất cả category thành công',
   //auth
   TOKEN_IS_REQUIRE: 'Vui lòng truyền token',
   AUTHENTICATION: 'The authentication',
};

module.exports = HTTP_MESSAGE;
