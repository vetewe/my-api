import multer from "multer";
import { error400 } from "../utils/customError.js";
import path from "path";

const allowedMimesTypes = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB

const filename = (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
};

const generateStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename,
    });
};

export const fileFilter = (req, file, cb) => {
    if (allowedMimesTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const err = error400(`Hanya ${allowedMimesTypes.join(", ")} yang diizinkan untuk diunggah`);
        cb(err, false);
    }
};

export const uploadImage = (destination) => {
    return multer({
        storage: generateStorage(destination),
        fileFilter,
        limits: {
            fileSize: MAX_FILE_SIZE,
        },
    });
};

export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return next(new error400('Ukuran file terlalu besar. Ukuran maksimum adalah 3MB.'));
    } else if (err) {
        return next(err);
    }
    next();
};