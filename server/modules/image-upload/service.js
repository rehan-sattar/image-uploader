const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

class ImageUploadService {
  static async uploadImage(imageBase64, extension) {
    const uploadDirectoryPath = path.join('.', 'uploads');
    const uploadDirectory = fs.existsSync(uploadDirectoryPath);
    if (!uploadDirectory) fs.mkdirSync(uploadDirectoryPath);
    const imageName = `${nanoid()}.${extension}`;
    const imagePath = path.join(uploadDirectoryPath, imageName);
    await fs.promises.writeFile(imagePath, imageBase64, 'base64');
    return imagePath;
  }
}

module.exports = ImageUploadService;
