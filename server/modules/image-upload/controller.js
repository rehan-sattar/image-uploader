const FileService = require('./service');

class ImageUploadControllers {
  static async uploadImage(req, res) {
    const { base64, extension } = req.body.image;
    const filePath = await FileService.uploadFile(base64, extension);
    return res.send({
      filePath,
    });
  }
}

module.exports = ImageUploadControllers;
