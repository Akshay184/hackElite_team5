var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var Product = mongoose.model('Products');
var csvfile = __dirname + "/../public/files/products.csv";
var stream = fs.createReadStream(csvfile);


var csvStream = csv()
    .on("data", function (data) {

        var item = new Product({
            name: data[0],
            price: data[1],
            category: data[2],
            description: data[3],
            manufacturer: data[4]
        });

        item.save(function (error) {
            console.log(item);
            if (error) {
                throw error;
            }
        });
    }).on("end", function () {
        console.log(" End of file import");
    });

stream.pipe(csvStream);
res.json({ success: "Data imported successfully.", status: 200 });
     
  })