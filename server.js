var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
    io = require('socket.io')(server),
	port = process.env.PORT || 3000,
	pcap = require("pcap"),
    util = require('util'),
    filter = 'tcp port '+ 3000,
    pcap_session = pcap.createSession("lo0", filter);

app.use(express.static(__dirname));

server.listen(port,function(){
	console.log('Express listening at ' + port);
});

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.link.ip.tcp.data;

    if (packet) {
        io.on('connection', function (socket) {
          socket.emit('packetReceived', packet);
          // socket.on('SendData', function (data) {
          //   console.log(data);
          // });
        });
    }

    console.log(packet);

    // if (data) {
    //     console.log(data.toString());
    // }
});
