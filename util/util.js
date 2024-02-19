/** @format */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const isCheckEmail = (email) => {
   const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   return reg.test(email);
};
const hashPw = (password) => {
   return bcrypt.hashSync(password, 10);
};
const isCheckPassword = (pw, pwUser) => {
   return bcrypt.compareSync(pw, pwUser);
};
const Util = {
   isCheckEmail,
   isCheckPassword,
   hashPw,
};
module.exports = Util;
