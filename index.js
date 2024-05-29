const express = require('express');
const multer = require('multer');
const {connectToMongoDB} = require('./config/connection');
const dotenv = require('dotenv');
const upload = require('./middlewares/upload');
const User = require('./models/user.model');

const PORT = 4000;
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'))

connectToMongoDB(process.env.MONGODBURL)
.then(() => {
    console.log('Db Connected .... ');
    app.listen(PORT, () => console.log('server started on -', PORT));
})
.catch(err => console.log('err in connecting DB - ', err));


// single file upload
// app.post('/create', upload.single('avatar'), (req,res) => {
//     console.log(req.body, '======== body =======');
//     console.log(req.file, '======== file =======');
//     console.log(req.files, '======== files =======');
//     const {name, avatar, email} = req.body;
//     User.create({
//         name,
//         avatar: req.file.path,
//         email
//     })
//     console.log(name, avatar, ' -------- avatar ----- ');
//     res.send('I am sending file....');
// })

// multi file upload...
app.post('/create', upload.array('avatar[]'), (req,res) => {
    // console.log(req.body, '======== body =======');
    // console.log(req.file, '======== file =======');
    // console.log(req.files, '======== files =======');
    const {name, avatar, email} = req.body;
    let path = "";
    req.files.forEach(file => path+= file.path+',');
    path = path.substring(0, path.lastIndexOf(','));;
    User.create({
        name,
        avatar: path,
        email
    })
    console.log(name, avatar, ' -------- avatar ----- ');
    res.send('I am sending file....');
})

app.get('/:email', async (req,res) => {
    const email = req.params.email;
    const user = await User.findOne({email});
    // console.log(user, ' ------- i am user -----');
    res.send(user.avatar);
}) 