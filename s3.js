const aws = require('aws-sdk');
const multer = require('multer');
const fs = require('fs')

const upload = multer({ dest: './uploads' })

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey= process.env.AWS_SECRET_KEY
const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    bucketName
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}

function getFileStream(key) {
    const downloadParams = {
        Key: key,
        Bucket: bucketName
    }

    return s3.getObject(downloadParams).createReadStream()
}

module.exports = {
    upload,
    uploadFile,
    getFileStream,
    s3,
    bucketName
}