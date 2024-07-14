const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection", function(socket){
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id: socket.id, ...data});
    })
    console.log("Connected");

    socket.on("disconnect",()=>{
        console.log("Disconnected from server");
        io.emit("user-disconnect", socket.id);
    })
});

app.get("/",function(req,res){
    res.render("index");
});

server.listen(3000,()=>console.log("Server started at 3000 port"));