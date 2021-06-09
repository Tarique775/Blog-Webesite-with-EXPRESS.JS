const multer = require('multer');
const path = require('path');

const UPLOAD_FOLDER = 'public/uploads/postImage/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-')}`;
        cb(null, fileName + fileExt);
    },
});

const upload = multer({
    storage,
    limits: 1224 * 1224 * 10,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'post-image') {
            if (
                file.mimetype === 'image/jpg'
                || file.mimetype === 'image/jpeg'
                || file.mimetype === 'image/png'
            ) {
                cb(null, true);
            } else {
                cb(new Error('only .jpg,.png,.jpeg formet allowed'));
            }
        } else {
            cb(new Error('There was an unknown error'));
        }
    },
});

module.exports = upload;
