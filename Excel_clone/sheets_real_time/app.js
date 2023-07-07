const express = require("express");
const { Server } = require("socket.io");
// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

//app.use(express.json());
app.use(express.static("public"));

let userList = []; 

// connection event is attached on io
io.on("connection" , function(socket){
    // console.log(socket.id + " connected !!!");

    socket.on("userConnected" , function(username){
        let userObject = { id : socket.id , username : username};
        userList.push(userObject);
        console.log(userList);
    })

    socket.on("cellClicked" , function(cellCordinates){
        let username;
        for(let i=0 ; i<userList.length ; i++){
            if(userList[i].id == socket.id){
                username  = userList[i].username;
            }
        }

        socket.broadcast.emit("setRealtimeCell" , {username , ...cellCordinates  })
    })


})


// tcp port 5500
server.listen(5500 , function(){
    console.log("Server started at port 5500 !!!");
})