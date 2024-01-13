const multer = require('multer');
const path = require('path')


const uploadDirectory = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // specify the destination for uploaded files:
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        // create a unique fieldname for each file upload 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// initialise multer with the configured storage 
const upload = multer({ storage: storage });

// Use 'upload.fields' to handle multiple files with different field names
const multerMiddleware = (fields) => upload.fields(fields);

module.exports = multerMiddleware