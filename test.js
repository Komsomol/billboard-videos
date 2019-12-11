// const getData = require('./getChartData');

// console.log(getData);

// const orchestra = async () => {
//     let data = await getData();

//     console.log(data);
// }

// console.log(orchestra())

var fs = require('fs');

// fs.readFile('data/top10.json', 'utf8', function (err, contents) {
//     console.log(contents);
// });


const billboardChart = () => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile('data/top10.json', 'utf8', function (err, contents) {
                resolve(JSON.parse(contents));
            });
        } catch (error) {
            reject(error)
        }
    });
};


console.log(billboardChart().then(data => console.log(data[0])))