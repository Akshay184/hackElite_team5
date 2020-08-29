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
const getApiAndEmit = async socket => {
    try {
        // const res = await axios.get(
        //     "https://api.darksky.net/forecast/PUT_YOUR_API_KEY_HERE/43.7695,11.2558"
        // ); // Getting the data from DarkSky
        // socket.emit("FromAPI", res.data.currently.temperature); // Emitting a new message. It will be consumed by the client
        console.log("rishi");
        temp = 0.01;
        socket.emit("FromAPI", [{
            name: "Location 1",
            location: {
                lat: 44.3954 + temp,
                lng: 2.162 + temp
            },
        }]); // Emitting a new message. It will be consumed by the client

    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        10000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});



server.listen(port, () => console.log(`Listening on port ${port}`));