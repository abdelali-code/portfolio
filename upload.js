const multer = require("multer");


// configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split("/")[1]);
    }
});

const imageFileFilter = (req, file, cb) => {
    console.log("file ", file);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });


const addFileToReq = (req, res, next) => {
    console.log("path", req.file.path);
    if (req.file) {
        console.log(req.file);
        req.body.image = req.file.path.substring(6);
        next();
    }
    else {
        next();
    }
}


module.exports = {
    upload,
    addFileToReq
}