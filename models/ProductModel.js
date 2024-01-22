/** @format */

const mongoose = require('mongoose');
var mongoose_delete = require('mongoose-delete');

const productSchema = new mongoose.Schema(
   {
      name: {type: String, required: true, unique: true},
      image: {type: String, required: true},
      category: {type: String, required: true},
      price: {type: Number, required: true},
      countInStock: {type: Number, required: true},
      description: {type: String},
      discount: {type: Number},
      selled: {type: Number},
   },
   {
      timestamps: true,
   },
);
// productSchema.plugin(mongoose_delete, {deletedAt: true});
// productSchema.plugin(mongoose_delete, {overrideMethods: 'all'});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
