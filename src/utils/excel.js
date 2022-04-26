const xl = require('excel4node');


const generateExcel = (data) => {
  const wb = new xl.Workbook();
    
  Object.keys(data).forEach((site) => {
    let totalReducedKB = 0;
    const ws = wb.addWorksheet(site);

    const style = wb.createStyle({
      font: {
        color: '#000000',
        bold: true,
      },
      fill: {
        type: 'pattern',
        bgColor: '#1fb6ff',
      }
    });

    ws.cell(1, 1).string('file name').style(style);
    ws.cell(1, 2).string('original (Kilobyte)').style(style);
    ws.cell(1, 3).string('compressed (Kilobyte)').style(style);
    ws.cell(1, 4).string('Reduced %').style(style);

    Object.keys(data[site]).forEach((file, index) => {
      ws.cell(index + 2, 1).string(file);
      ws.cell(index + 2, 2).number(data[site][file].before);
      ws.cell(index + 2, 3).number(data[site][file].after);

      totalReducedKB += data[site][file].before - data[site][file].after;
      ws.cell(index + 2, 4).number(parseInt(100 - (100 * data[site][file].before / data[site][file].after)));
    });

    ws.cell(1, 5).string(`Total reduced (Kilobyte)`).style(style);
    ws.cell(2, 5).number(parseFloat((totalReducedKB).toFixed(2)));
  });

  wb.write('results.xlsx');
};

module.exports = generateExcel;
