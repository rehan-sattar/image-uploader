const Image = require('./model');

class ImageRepository {
  static async save(url) {
    const image$ = new Image({ url });
    try {
      await image$.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ImageRepository;
