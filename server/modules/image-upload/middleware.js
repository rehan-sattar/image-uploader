const FileType = require('file-type');

const validateImage = async (req, res, next) => {
  const imageBase64 = req.body.image;
  const buffer = Buffer.from(imageBase64, 'base64');
  const sizeOfBuffer = buffer.length;

  const type = await FileType.fromBuffer(buffer);

  if (!type) {
    return res.status(400).send({
      message: 'Please upload an image.',
    });
  }

  if (type.ext !== 'png' && type.ext !== 'jpg') {
    return res.status(400).send({
      invalidFormat: type.ext,
      message: 'Please upload an image only in png or jpg format',
    });
  }

  req.body.image = {
    base64: imageBase64,
    extension: type.ext,
  };

  next();
};

module.exports = {
  validateImage,
};
