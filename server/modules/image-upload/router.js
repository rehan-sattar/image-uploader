const router = require('express').Router();

const ImageUploadMiddleware = require('./middleware');
const ImageUploadControllers = require('./controller');

router.post(
  '/',
  ImageUploadMiddleware.validateImage,
  ImageUploadControllers.uploadImage
);

module.exports = router;
