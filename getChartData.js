// only gets a list

const cheerio = require('cheerio');
const request = require('request');

let getTop100 = (URL = 'https://www.billboard.com/charts/hot-100') => {
    return new Promise((resolve, reject) => {
        try {
            request(URL, (error, response, body) => {
                if (!error) {
                    const $ = cheerio.load(body);
                    let list = JSON.parse($('#charts').attr('data-chart-videos'));
                    resolve(list)
                } else {
                    reject(error)
                }
            });
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = getTop100
