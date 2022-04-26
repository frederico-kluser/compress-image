const fs = require('fs');
const ENUMS = require('./enums');
const { getDownloadedChromeSiteUrl } = require('./general');
const { getAllFiles, getAllImages } = require('./getFilesInfo');

/**
 * Function to transport files from one folder to another.
 * @param {string} site site pathname
 * @param {string} device 'desktop' or 'mobile'
 * @param {string} file file name with extension
 * @param {string} origem computer path
 * @returns {boolean} true if file was copied
 */
const copyFile = (
  site,
  device,
  file,
  origem = ENUMS.origem,
) => new Promise(async (resolve, reject) => {
  const items = await getAllFiles(`${origem}/${site}/${device}`);
  const siteFolder = getDownloadedChromeSiteUrl(items);

  if (!fs.existsSync(ENUMS.files)) {
    fs.mkdirSync(ENUMS.files);
  }

  if (!fs.existsSync(`${ENUMS.files}/${site}`)) {
    fs.mkdirSync(`${ENUMS.files}/${site}`);
  }

  if (!fs.existsSync(`${ENUMS.files}/${site}/${device}`)) {
    fs.mkdirSync(`${ENUMS.files}/${site}/${device}`);
  }

  const source = `${origem}/${site}/${device}/${siteFolder}/${file}`;
  const destination = `${ENUMS.files}/${site}/${device}/${file}`;

  fs.copyFile(source, destination, (err) => {
    if (err) reject(err);
    resolve(true);
  });
});

const copyAllSiteImages = async () => new Promise(async (resolve) => {
  const sites = await getAllFiles(ENUMS.origem);
  const files = {};

  for await (const site of sites) {
    const items = await getAllFiles(`${ENUMS.origem}/${site}/${ENUMS.desktop}`);
    const siteFolder = getDownloadedChromeSiteUrl(items);
    const images = await getAllImages(`${ENUMS.origem}/${site}/${ENUMS.desktop}/${siteFolder}`);
    images.forEach(async (image) => {
      files[site] = images;
      if (await copyFile(site, ENUMS.desktop, image) !== true) {
        console.error('Error copying file', site, image);
      }
    });
  };

  resolve(files);
});

const getAllContent = async () => new Promise(async (resolve) => {
  const sites = await getAllFiles(ENUMS.files);
  const files = [];
  for await (const site of sites) {
    const items = await getAllFiles(`${ENUMS.files}/${site}/${ENUMS.desktop}`);
    items.forEach((item) => {
      files.push(`${ENUMS.files}/${site}/${ENUMS.desktop}/${item}`);
    });
  }
  resolve(files);
});

module.exports = {
  copyFile,
  copyAllSiteImages,
  getAllImages,
  getAllContent,
};
