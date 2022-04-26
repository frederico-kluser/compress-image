const fs = require('fs');

const getFileSize = (filePath) => {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;
  // Convert the file size to megabytes (optional)
  return fileSizeInBytes / (1024);
};

const getAllFiles = (filePath) => new Promise((resolve, reject) => {
  fs.readdir(filePath, (err, files) => {
    if (err) reject(err);
    resolve(files);
  });
});

const getAllImages = async (filePath) => new Promise(async (resolve) => {
  const result = await getAllFiles(filePath);
  const images = result.filter((file) => file.includes('.png') || file.includes('.jpg') || file.includes('.jpeg'));
  resolve(images);
});

const checkIfFileExists = (file) => new Promise((resolve, reject) => {
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) resolve(false);
    resolve(true);
  });
});

module.exports = {
  getFileSize,
  getAllFiles,
  getAllImages,
  checkIfFileExists,
};
