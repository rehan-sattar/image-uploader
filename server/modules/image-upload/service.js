const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

class ImageUploadService {
  static async uploadFile(imageBase64, extension) {
    const uploadDirectoryPath = path.join('.', 'uploads');
    const uploadDirectory = fs.existsSync(uploadDirectoryPath);
    if (!uploadDirectory) fs.mkdirSync(uploadDirectoryPath);
    const fileName = `${nanoid()}.${extension}`;
    const filePath = path.join(uploadDirectoryPath, fileName);
    await fs.promises.writeFile(filePath, imageBase64, 'base64');
    return filePath;
  }
}

module.exports = ImageUploadService;
