/** @format */

const express = require('express');
const routers = require('./routes');
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
// routers(app);
app.get('/', (req, res) => {
   return res.send('GET request to the homepage');
});
const db = 'mongodb+srv://nqdcntt2002:doanh2002716@shopee.kpxwzh2.mongodb.net/shopee_new';
// const db = 'mongodb://localhost:27017/shopee';
const connect = async () => {
   await mongoose.connect(db);
   console.log('Connect DB Success!');
};
connect();

const port = process.env.PORT || 8080;
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
