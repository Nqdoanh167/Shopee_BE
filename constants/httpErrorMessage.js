/** @format */

const HTTP_MESSAGE = {
   SUCCESS: 'Thành công',
   ERROR: 'Thất bại',
   // body
   THE_INPUT_IS_REQUIRE: 'Vui lòng điền vào mục này.',
   EMAIL_NOT_VERIFY: 'Email chưa đúng định dạng.',
   PASSWORD_NOT_VERIFY: 'password chưa đúng định dạng.',

   // user
   NOT_EXISTED_USER: 'Người dùng chưa tồn tại',
   EXISTED_USER: 'Người dùng đã tồn tại',
   PASSWORD_NOT_MATCH: 'Mật khẩu vào không đúng',
   LOGIN_SUCCESS: 'Đăng nhập thành công',
   ID_IS_REQUIRE: 'Vui lòng truyền userId',
   IDS_IS_REQUIRE: 'Vui lòng truyền ids',
   UPDATE_USER_SUCCESS: 'Cập nhật người dùng thành công',
   DELETE_USER_SUCCESS: 'Xóa người dùng thành công',
   GET_ALL_USER_SUCCESS: 'Lấy tất cả thông tin người dùng thành công',
   GET_USER_SUCCESS: 'Lấy thông tin người dùng thành công',

   //auth
   TOKEN_IS_REQUIRE: 'Vui lòng truyền token',
   AUTHENTICATION: 'The authentication',
};

module.exports = HTTP_MESSAGE;
