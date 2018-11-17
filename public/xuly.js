var socket = io("http://localhost:3000"); 
$(document).ready(()=>{
    $("#btnTenRoom").click(function(){
        socket.emit("gui-tenphong", $("#txtTenRoom").val()); 
    }); 
    $("#btnSendMes").click(()=>{
        socket.emit("user-send-messages", $("#txtMessage").val()); 
    }); 
}); 
socket.on("dsPhong", function(data){
    $("#roomDangCo").html(""); 
    data.map(function(r){
        $("#roomDangCo").append("<div class='room'>" + r + "</div>"); 
    }); 
}); 
socket.on("server-send-room-socket", function(data){
    $("#roomHienTai").html(data); 
}); 
socket.on("server-chat", function(data){
    $("#right").append("<div class='mes'>" + data + "</div>"); 
}); 