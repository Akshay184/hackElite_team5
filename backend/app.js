const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const mongoose = require('mongoose');
const vehicle_data = require("./Vehicle");
mongoose.connect('mongodb://127.0.0.1:27017/vehicle_data', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
var i = 1;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
// var fastcsv = require("fast-csv");

// require("./Vehicle");
// const mongodb = require("mongodb").MongoClient;

// const fs = require('fs');
// var csvfile = __dirname + "/data.csv";
// var stream = fs.createReadStream(csvfile);
// var i = 0;
// // var dbo = db.db("vehicle_data");
// let csvData = [];
// let csvStream = fastcsv
//     .parse()
//     .on("data", function (data) {
//         csvData.push({
//             index: i++,
//             bus_code: data[0],
//             trip_id: data[1],
//             gps_datetime: data[2],
//             location: data[3],
//             dtd: data[4],
//             corridor: data[5],
//             location: {
//                 lat: parseFloat(data[7]),
//                 lng: parseFloat(data[6])
//             },
//             // lon: parseFloat(data[6]),
//             // lat: parseFloat(data[7]),
//             speed: data[8],
//             course: data[9],
//             color: data[10]
//         });
//     })
//     .on("end", function () {
//         // remove the first line: header
//         csvData.shift();

//         console.log(csvData);

//         mongodb.connect(
//             url,
//             { useNewUrlParser: true, useUnifiedTopology: true },
//             (err, client) => {
//                 if (err) throw err;

//                 client
//                     .db("vehicle_data")
//                     .collection("vehicle_data")
//                     .insertMany(csvData, (err, res) => {
//                         if (err) throw err;

//                         console.log(`Inserted: ${res.insertedCount} rows`);
//                         client.close();
//                     });
//             }
//         );
//     });

// stream.pipe(csvStream);

const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
var temp = 0.0001;

var collections = mongoose.connections[0].collections;
var names = [];

Object.keys(collections).forEach(function (k) {
    names.push(k);
});

let db_instance;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    db_instance = db;
});

console.log(names);
const getApiAndEmit = async socket => {
    try {
        // const res = await axios.get(
        //     "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
        // ); // Getting the data from DarkSky
        // socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
        // fs.createReadStream('data.csv')
        //     .pipe(csv())
        //     .on('data', (row) => {
        //         socket.emit("FromAPI", [row]);
        //         console.log(row);
        //     })
        //     .on('end', () => {
        //         console.log('CSV file successfully processed');
        //     });

        let result;
        var dbo = db_instance.db("vehicle_data");

        await dbo.collection("vehicle_data").findOne({ index: i }, function (err, doc) {
            if (err) throw err;
            result = doc;
            socket.emit("FromAPI", result);
            console.log(result);
            // db.close();
        });
        // console.log(result);
        // await vehicle_data.find({ index: i }, function (err, docs) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         console.log("First function call : ", docs);
        //     }
        // });
        console.log(i);
        i++;
        console.log("rishi" + temp);
        // Emitting a new message. It will be consumed by the client

    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        1000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});



server.listen(port, () => console.log(`Listening on port ${port}`));