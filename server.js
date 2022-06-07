"use strict";

const express =require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(3000);
app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username);
    })

    socket.on("exituser", function(username){
        socket.broadcast.emit("update", username);
    })
    socket.on("chat", function(message){
        socket.broadcast.emit("chat", message);
    })
})

server.listen(3000)

