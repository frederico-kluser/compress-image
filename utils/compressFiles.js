const fs = require('fs');
const tinify = require('tinify');

tinify.key = process.env.TINIFY_API_KEY;

const compressFile = (filePath, fileName, fileExtension) => new Promise((resolve, reject) => {
  fs.readFile(`${filePath}/${fileName}.${fileExtension}`, (err1, sourceData) => {
    if (err1) reject(err1);
    tinify.fromBuffer(sourceData).toBuffer((err2, resultData) => {
      if (err2) reject(err2);
      fs.writeFile(`${fileName}-compressed.${fileExtension}`, resultData, 'binary', (err3) => {
        if (err3) reject(err3);
        resolve(true);
      });
    });
  });
});
module.exports = compressFile;
