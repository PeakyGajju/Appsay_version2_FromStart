
const express=require('express');
const bodyParser=require('body-parser');
const http=require('http');
const socketio=require('socket.io');
const formatMessage = require('./utils/messages');




const app=express();
const server=http.createServer(app);
const io=socketio(server);

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

var bot='ChatBot'

io.on('connection', function(socket){
    console.log("New WS connection");
    console.log("Socket id: "+socket.id);


        socket.on('chatMessage', function(msgObj){
        console.log("Message from client");

        io.emit('message', formatMessage(msgObj.to,msgObj.msg));
    })
})




const port=3000 || process.env.PORT;

server.listen(port, function(){
    console.log(`Server started on port ${port}`);
});