const fs = require('fs');
const tinify = require('tinify');
const ENUMS = require('./enums');
const { getFileName } = require('./general');
const { checkIfFileExists } = require('./getFilesInfo');

tinify.key = process.env.TINIFY_API_KEY;

const compressFile = (site, device, file) => new Promise((resolve, reject) => {
  const { fileName, fileExtension } = getFileName(file);
  fs.readFile(`${ENUMS.files}/${site}/${device}/${file}`, (err1, sourceData) => {
    if (err1) reject(err1);
    tinify.fromBuffer(sourceData).toBuffer((err2, resultData) => {
      if (err2) reject(err2);
      fs.writeFile(`${ENUMS.files}/${site}/${device}/${fileName}-compressed${fileExtension}`, resultData, 'binary', (err3) => {
        if (err3) reject(err3);
        resolve(true);
      });
    });
  });
});

const findCompressedVersion = async (site, device, file) => {
  const { fileName, fileExtension } = getFileName(file);
  return await checkIfFileExists(`${ENUMS.files}/${site}/${device}/${fileName}-compressed${fileExtension}`);
};

module.exports = { 
  compressFile,
  findCompressedVersion,
};
