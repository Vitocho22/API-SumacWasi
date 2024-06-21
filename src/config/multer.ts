// config/multer.ts
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from './s3';
import { S3Client } from '@aws-sdk/client-s3';

const upload = multer({
    storage: multerS3({
        s3: s3 as S3Client, // Casting to S3Client
        bucket: process.env.S3_BUCKET!,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

export default upload;
