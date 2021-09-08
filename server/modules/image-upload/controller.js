class ImageUploadControllers {
  static async uploadImage(req, res) {
    return res.send({
      message: 'you are in controller',
    });
  }
}

module.exports = ImageUploadControllers;
