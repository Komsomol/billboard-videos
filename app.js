const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8081;
var fs = require('fs');


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "views")));

// test end point
app.get("/test", (req, res) => {
    res.send({
        status: "Server is up"
    });
});

// serve route
app.get("/test", function (req, res) {
    billboardChart().then(result => {
        if (result.status == "OK") {
            res.render("index", {
                title: "Billboard Top 100",
                message: "Billboard Top 100",
                songs: result.data
            });
        } else {
            res.send(`Error ${result.data}`);
        }
    });
});

app.get("/", function (req, res) {
    billboardChart().then(result => {
        // res.json(result.data)
        console.log(result);

        res.render("videos", {
            title: "Billboard Top 100",
            message: "Billboard Top 100",
            songs: result
        });
    });
});

// app.get("/rap", function (req, res) {
//     videoChart("r-b-hip-hop-songs").then(result => {
//         if (result.status == "OK") {
//             // res.json(result.data)
//             res.render("videos", {
//                 title: "Hot R&B/hip-hop songs",
//                 message: "Hot R&B/hip-hop songs",
//                 songs: result.data
//             });
//         } else {
//             res.send(`Error ${result.data}`);
//         }
//     });
// });

// listen server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});


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

// const videoChart = (chart) => {
//     return new Promise((resolve, reject) => {
//         getVideos(chart)
//             .then((result) => {
//                 console.log(result);
//                 resolve({
//                     status: "OK",
//                     data: result
//                 });
//             }).catch((error) => {
//                 console.log(error);
//                 reject({
//                     status: "Error",
//                     data: error
//                 });
//             });
//     });
// };