/** @format */

const User = require('../models/UserModel');

const getUserById = async (id) => {
   return await User.findById(id);
};

const getAllByCondition = async (filter = {}) => {
   return await User.find(filter);
};
const getUserByCondition = async (filter = {}) => {
   return await User.findOne(filter);
};
const createUser = async (data) => {
   return await User.create(data);
};

const deleteUser = async (filter = {}) => {
   return await User.delete(filter);
};
const deleteU = async (filter = {}) => {
   return await User.deleteOne(filter);
};
const deleteManyUser = async (filter = {}) => {
   return await User.deleteMany(filter);
};
const updateUser = async (filter, data, options) => {
   return await User.updateOne(filter, data, options);
};

const UserRepo = {
   getUserById,
   createUser,
   getUserByCondition,
   deleteUser,
   updateUser,
   getAllByCondition,
   deleteU,
   deleteManyUser,
};
module.exports = UserRepo;
