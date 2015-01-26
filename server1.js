var koa = require('koa'),
	app = koa(),
	logger = require('koa-logger'),
	staticDir = require('koa-static'),
	port = process.env.PORT || 3000,
	net = require('net');

app.use(logger());
app.use(staticDir('./'));

// app.listen(port, function() {
// 	console.log("Koa server listening on port %s", port);
// });

var options = {

	host : "localhost",
	port : 3000,
	family : 4
}


var client = net.connect(options, function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});
 
client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});
 
client.on('close', function() {
	console.log('Connection closed');
});
var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	// socket.pipe(socket);
});
 
server.listen(options.port,function(){
	console.log('server listening on ' + options.port);
});




// var nativeDns = require('native-dns');
// var publicIp = require('public-ip');
// var dns = require('dns');

// // dns.lookup('www.flipkart.com', function onLookup(err, addresses, family) {
// //   console.log('addresses:', addresses);
// //   console.log(family);
// // });

// dns.resolve4('www.flipkart.com', function (err, addresses) {
//   if (err) throw err;

//   console.log('addresses: ' + JSON.stringify(addresses));

//   addresses.forEach(function (a) {
//     dns.reverse(a, function (err, domains) {
//       if (err) {
//         throw err;
//       }

//       console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
//     });
//   });
// });

var pcap = require("pcap"),
    pcap_session = pcap.createSession("", "tcp"),
    matcher = /safari/i;

console.log("Listening on " + pcap_session.device_name);

pcap_session.on('packet', function (raw_packet) {
    var packet = pcap.decode.packet(raw_packet),
        data = packet.link.ip.tcp.data;

    if (data) {
    	console.log(packet);
        //console.log(pcap.print.packet(packet));
        //console.log(data.toString());
    }
});

