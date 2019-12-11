// only gets videos given a list

require('dotenv').config();;
const YouTube = require("youtube-node");
const youTube = new YouTube();
const getData = require('./getChartData');
const fs = require('fs');

youTube.setKey(process.env.YOUTUBE_KEY);

// get chart data by scraping billboard
const gotTop100 = async () => {
    let data = await getData();
    return data;
}

// get all the videos links to associated billboard chart
const getYoutubeLink = (rank, title, cover) => {
    return new Promise((resolve, reject) => {
        youTube.search(title + ' Official Music Video', 2, function (error, result) {

            if (error) {
                reject(console.log(error));
            }
            else {
                let data = [];
                data.push(rank, title, cover);

                if (result.items[0].id.kind === 'youtube#channel') {
                    data.push(result.items[1].snippet.title);
                    data.push(result.items[1].id.videoId);
                    data.push(result.items[1].snippet.thumbnails.high.url);
                } else {
                    data.push(result.items[0].snippet.title);
                    data.push(result.items[0].id.videoId);
                    data.push(result.items[0].snippet.thumbnails.high.url);
                }
                resolve(data);
            }
        });
    });
};

// creates the data object of songs and their youtube links
const getVideos = () => {
    var data = new Promise((resolve, reject) => {
        // lets get the songs
        gotTop100().then(function (result) {
            console.log(typeof result);
            console.log("---------");
            console.log(result);
            // holder for getYouTube links promises
            let data = [];

            for (let i = 0; i < result.length; i++) {
                // get youtube link for each of the songs
                // console.log(result.songs[i].rank);
                data.push(getYoutubeLink(result[i].rank, result[i].title, result[i].image));
            }

            // chain all the youtube link promises
            Promise.all(data)
                .then(function (data) {
                    // when the promises of all objects of song names and video links is done
                    console.log(data);
                    resolve(data);
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    });
    return data;
};

// saves object to disk
const saveData = () => {
    getVideos()
        .then((result) => {

            let file = JSON.stringify(result, null, 2);

            fs.writeFile("data/top10.json", file, function (err) {

                if (err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });
        }).catch((error) => {
            console.log(error);
            reject({
                status: "Error",
                data: error
            });
        });
}

// saveData();

module.exports = saveData;