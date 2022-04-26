require('dotenv').config();
const { findCompressedVersion, compressFile } = require('./src/utils/compressFiles');
const { copyAllSiteImages } = require('./src/utils/copyFiles');
const ENUMS = require('./src/utils/enums');
const generateExcel = require('./src/utils/excel');
const { replaceAll, getFileName } = require('./src/utils/general');
const { getFileSize } = require('./src/utils/getFilesInfo');

const init = async () => {
	const sites = await copyAllSiteImages();
	const proccess = {};
	const excel = {};
	const sitesFomatted = Object.keys(sites);

	for await (const site of sitesFomatted) {
		const images = sites[site];
		let convertedItems = 0;
		const fullSizePath = () => `https://onepeloton.com/${replaceAll(site, ' ', '/')}`;
		proccess[fullSizePath()] = `${convertedItems}/${images.length - 1}`;
		excel[fullSizePath()] = {};

		for await (const image of images) {
			const haveCompressedVersion = await findCompressedVersion(site, ENUMS.desktop, image);
			if (!haveCompressedVersion) {
				await compressFile(site, ENUMS.desktop, image);
			}

      const { fileName, fileExtension } = getFileName(image);
      excel[fullSizePath()][image] = {};
			excel[fullSizePath()][image]['before'] = parseFloat((await getFileSize(`${ENUMS.files}/${site}/${ENUMS.desktop}/${image}`)).toFixed(2));
			excel[fullSizePath()][image]['after'] = parseFloat((await getFileSize(`${ENUMS.files}/${site}/${ENUMS.desktop}/${fileName}-compressed${fileExtension}`)).toFixed(2));
			proccess[fullSizePath()] = `${convertedItems}/${images.length - 1}`;
			convertedItems++;
			console.clear();
			console.table(proccess);
		}
	}

	generateExcel(excel);
};

init();
