const fs = require('fs');

const getFileSize = (filePath, fileName, fileExtension) => {
  const stats = fs.statSync(`${filePath}/${fileName}.${fileExtension}`);
  const fileSizeInBytes = stats.size;
  // Convert the file size to megabytes (optional)
  return fileSizeInBytes / (1024 * 1024);
};

module.exports = getFileSize;
