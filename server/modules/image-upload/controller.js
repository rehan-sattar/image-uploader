const ImageRepository = require('./repository');
const FileService = require('./service');

const SERVER_BASE_URL = process.env.SERVER_BASE_URL;

if (!SERVER_BASE_URL) {
  console.error('Server URL not found.');
  console.error(`
    STEPS TO SOLVE THIS PROBLEM:
    1. Make sure to have an environment variable file.
    2. Add a key SERVER_BASE_URL=[URL_HERE]
    3. Restart the server
  `);
}
class ImageUploadControllers {
  static async uploadImage(req, res) {
    const { base64, extension } = req.body.image;
    const imagePath = await FileService.uploadImage(base64, extension);
    const imageUrl = `${SERVER_BASE_URL}/${imagePath}`;
    try {
      await ImageRepository.save(imageUrl);
    } catch (err) {
      console.log(err);
      return res.status(422).send({
        message: 'error while saving record to database.',
        err,
      });
    }
    return res.send({ url: imageUrl });
  }
}

module.exports = ImageUploadControllers;
