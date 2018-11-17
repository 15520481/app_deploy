var express = require("express"); 
var app = express(); 
var server = require("http").Server(app); 
var io = require("socket.io")(server); 

server.listen(3000); 
app.use(express.static("public")); 
app.set("view engine", "ejs");
app.set("views", "./views"); 

app.get("/", (req, res) => {
    res.render("trangchu"); 
}); 

io.sockets.on("connection", function(socket){
    console.log( socket.id + " đã đăng nhập vào mạng" ); 
    socket.on("disconnect", ()=>{
        console.log( socket.id + " đã thoát khỏi mạng " ); 
    })
    socket.on("gui-tenphong", function(data){
        socket.join(data); 
        socket.Phong = data; 
        var mang = []; 
        for ( r in socket.adapter.rooms ){
            mang.push(r); 
        }
        io.sockets.emit("dsPhong", mang); 
        socket.emit("server-send-room-socket", data);    
    }); 
     
    socket.on( "user-send-messages", (data) => {
        io.sockets.in(socket.Phong).emit("server-chat", data); 
    } ); 
}); 