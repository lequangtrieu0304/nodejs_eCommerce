import express from 'express';
import multer from 'multer';
import {isAuth, isAdmin} from '../utils';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, path.join('uploads/img'));
    },
    filename(req, file, cb){
        cb(null, `${Date.now()}.jpg`);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else {
        cb(new Error('Not an image! Please upload an image.', 400), false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})

router.post('/', isAuth, isAdmin, upload.single('image'), (req, res) => {
    res.status(201).send({image: `${req.file.path}`})
})

export default router;