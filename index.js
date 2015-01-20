var nativeDns = require('native-dns');
var publicIp = require('public-ip');
var dns = require('dns');

// dns.lookup('www.flipkart.com', function onLookup(err, addresses, family) {
//   console.log('addresses:', addresses);
//   console.log(family);
// });

dns.resolve4('www.flipkart.com', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  addresses.forEach(function (a) {
    dns.reverse(a, function (err, domains) {
      if (err) {
        throw err;
      }

      console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
    });
  });
});

