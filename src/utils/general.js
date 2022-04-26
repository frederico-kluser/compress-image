const getDownloadedChromeSiteUrl = (items) => {
  let siteFolder = '';
  items.forEach((item) => {
    if (item.indexOf('.html') === -1) {
      siteFolder = item;
    }
  });

  return siteFolder;
};

let storage = {};
const storageGetter = (property) => storage[property];
const storageSetter = (property, value) => {
  storage[property] = value;
};

const getFileName = (file) => {
  const fileName = file.substring(0, file.lastIndexOf('.'))
  const fileExtension = file.substring(file.lastIndexOf('.'))

  return {
    fileName,
    fileExtension,
  };
};

const replaceAll = (str, find, replace) => str.replace(new RegExp(find, 'g'), replace);

const fixUrlName = (site) => {
  let urlBase = 'https://onepeloton.';
  let url = '';

  if (site.indexOf('(') === 0) {
    url = site.substring(1, site.length);
    const closeParenthesisIndex = url.indexOf(')');
    url = url.replace(')', '/');
  } else {
    urlBase += 'com/';
    url = site;
  }

  return `${urlBase}${replaceAll(url, ' ', '/')}`; 
};

module.exports = {
  getDownloadedChromeSiteUrl,
  storageGetter,
  storageSetter,
  getFileName,
  replaceAll,
  fixUrlName,
};
