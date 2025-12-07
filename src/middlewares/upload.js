// 📂 FILE: src/middlewares/upload.js

const upload = require('../config/multer');

// Middleware pembungkus biar error multer tertangkap rapi
const uploadMiddleware = (fieldName) => {
    return (req, res, next) => {
        const uploadSingle = upload.single(fieldName);

        uploadSingle(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            next();
        });
    };
};

module.exports = uploadMiddleware;
