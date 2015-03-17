var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
  io = require('socket.io')(server),
	port = process.env.PORT || 3000,
	pcap = require("pcap"),
  filter = 'tcp port '+ 3000,
  pcap_session = pcap.createSession("lo0", filter);

app.use(express.static(__dirname));

server.listen(port,function(){
	console.log('Express listening at ' + port);
});

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.link.ip.tcp.data;
      // console.log(pcap.print.packet(packet));
      // console.log(data.toString());
      io.on('connection', function (socket) {
        if(data){
          socket.emit('packetReceived', packet);
        }
        socket.on('handshake-done',function(resp){
          console.log(resp);
        });
      });
});

io.on('end',function(){
  console.log('Connection is ended');
});
