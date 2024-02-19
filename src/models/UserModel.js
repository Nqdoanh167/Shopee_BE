/** @format */

const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');
const userSchema = new mongoose.Schema(
   {
      name: {type: String},
      email: {type: String, required: true},
      password: {type: String, required: true},
      dob: {type: Date},
      isAdmin: {type: Boolean, default: false, required: true},
      phone: {type: String},
      address: {type: String},
      avatar: {type: String},
      status: {
         type: Number,
         default: 1,
      },

      // status = 1: chưa accept mail 2: ok  3: ban
   },
   {
      timestamps: true,
   },
);

// userSchema.plugin(mongoose_delete, {deletedAt: true});
// userSchema.plugin(mongoose_delete, {overrideMethods: 'all'});
const User = mongoose.model('User', userSchema);
module.exports = User;
