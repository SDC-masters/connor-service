const faker = require('faker');
const someObject = require('./data.json');
const fs = require('fs');
const path = require('path');

const generateProducts = () => {
  let records = [];
  for (let i = 0; i < 7; i++) {
    let randomIndex = Math.floor(Math.random() * 999);
    let record = someObject[randomIndex];
    records.push(record);
  }
  return records;
};

const generatePage = () => {
  let randomIndex = Math.floor(Math.random() * 999);
  let randomName = someObject[randomIndex].name;
  return randomName;
};

const stream = fs.createWriteStream('/Volumes/Seagate Backup Plus Drive/relatedProducts.csv', {flags: 'a'});

function writeToCSV(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      let string = '';
      let product = generatePage();
      let json = generateProducts();
      string += `${product}| ${JSON.stringify(json)}\n`;
      if (i === 1) {
        writer.write(string, encoding, callback);
      } else {
        ok = writer.write(string, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

writeToCSV(stream, 'utf-8', () => {
  stream.end();
});

