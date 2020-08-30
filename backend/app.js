const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // < Interesting!
temp = 0.0100;
const getApiAndEmit = async socket => {
    try {
        // const res = await axios.get(
        //     "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
        // ); // Getting the data from DarkSky
        // socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
        console.log("rishi");
        temp += 0.0001  ;
        console.log(temp);
        socket.emit("FromAPI", [{
            name: "Location 1",
            location: {
                busCode: "DMR 5049",
                tridId: 5.1222,
                gpsDateTime: 9,
                location: 2,    
                dtd: 0.2312,
                corridor: 9,
                lat: 41.363998 + temp,
                lng: 2.167493 + temp,
                speed: 0,
                course: 808,
                color: "MERAH KUNING"
            },
        }]); // Emitting a new message. It will be consumed by the client

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