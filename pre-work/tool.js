const http = require('http');
const https = require('https');
const Stream = require('stream').Transform;
const fs = require('fs');
const moment = require('moment');

const URL = 'http://ic-common.pmang.cloud/static/bdt_book/thumbnail/';

const API_CHARACTERS_KOREA = 'https://browndust-api.pmang.cloud/v1/book/character/getAll';

const API_CHARACTERS_FILE_NAME = `getAll_${moment().format('YYYYMMDDTHHmmSSS')}.json`;

https.request(API_CHARACTERS_KOREA, response => {
  const data = new Stream();
  console.log('Download api resource...');
  response.on('data', chunk => data.push(chunk));
  response.on('end', () => fs.writeFile(`${__dirname}/${API_CHARACTERS_FILE_NAME}`, data.read(), downloadThumbnails));
}).end();

return;

function downloadThumbnails(error) {

  if (error) throw Error('downloadThumbnails', error);

  const thumbnails = require(`./${API_CHARACTERS_FILE_NAME}`);
  Promise.all(
    thumbnails
      .map(d => {
        return {
          url: `${URL}${d._uiIconImageName.split('*')[1]}.png`,
          name: `${d._uiIconImageName.split('*')[1]}.png`,
        }
      })
      .forEach(({ url, name }, index, arr) => {
        try {
          http.request(url, response => {
            const data = new Stream();
            console.log(`parse:${url}`);
            response.on('data', chunk => data.push(chunk));
            response.on('end', () => fs.writeFileSync(`./public/resource/thumbnail/${name}`, data.read()));
          }).end();
        } catch (error) {
          console.log('thumbnails', error);
        }
      })
  ).then(() => {
    fs.unlinkSync(`${__dirname}/${API_CHARACTERS_FILE_NAME}`);
  });
}

// icons.forEach(({ url, name }, index, arr) => {
//     http.request(url, response => {
//         const data = new Stream();
//         console.log(`parse: ${ url }`);
//         response.on('data', chunk => data.push(chunk));
//         response.on('end', () => fs.writeFileSync(`./ public / resource / icon / ${ name }`, data.read()));
//     }).end();
// });
