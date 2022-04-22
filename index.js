require('dotenv').config();
const compressFile = require('./utils/compressFiles');
const getFileSize = require('./utils/getFilesInfo');

compressFile('./', 'demo', 'png').then(() => {
  console.log('./demo.png', getFileSize('./', 'demo', 'png'));
  console.log('./demo-compressed.png', getFileSize('./', 'demo-compressed', 'png'));
});
