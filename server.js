var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	port = process.env.PORT || 3000,
	router = express.Router(),
	pcap = require("pcap"),
    util = require('util'),
    filter = 'tcp port '+ 3000,
    pcap_session = pcap.createSession("lo0", filter),
    matcher = /3000/i;

app.use(express.static(__dirname));

server.listen(port,function(){
	console.log('Express listening at ' + port);
});

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.link.ip.tcp.data;
    console.log(pcap.print.packet(packet));
    if (data) {
        util.print(data.toString());
    }
});
