const express = require('express');
const multer = require('multer');
const {connectToMongoDB} = require('./config/connection');
const dotenv = require('dotenv');


const PORT = 4000;
dotenv.config();

const app = express();

connectToMongoDB(process.env.MONGODBURL)
.then(() => {
    console.log('Db Connected .... ');
    app.listen(PORT, () => console.log('server started on -', PORT));
})
.catch(err => console.log('err in connecting DB - ', err));

