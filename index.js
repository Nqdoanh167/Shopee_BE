/** @format */

const express = require('express');
const routers = require('./src/routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(cors()); // Allow requests from any IP
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));
routers(app);
const db = 'mongodb://localhost:27017/shopee';
const connect = async () => {
   await mongoose.connect(db);
   console.log('Connect DB Success!');
};
connect();

const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
