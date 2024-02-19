/** @format */

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
// Configure Multer
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/'); // Uploads will be stored in the 'uploads/' directory
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
   },
});

const upload = multer({storage: storage});
const multerUtil = {
   upload,
};
module.exports = multerUtil;
