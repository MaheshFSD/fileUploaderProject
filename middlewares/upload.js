const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, 'uploads/');
    },
    filename: (req,file,cb) => {
        console.log(req.file);
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({
    storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg') cb(null, true);
        else {
            console.log('upload only png/jpg files only');
            cb(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 3 // 100kb limit here
    }
})

module.exports = upload;