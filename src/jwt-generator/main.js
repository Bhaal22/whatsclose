// sign with default (HMAC SHA256)
var jwt = require('jsonwebtoken');


var payload = {
  access_concerts: true,
  access_venues: false
};

var secret = "secret";

var options = {
  issuer: "whatsclose_inc"
};

var token = jwt.sign(payload, secret, options);

console.log(token);


var decoded = jwt.verify(token, secret);
console.log(decoded);

// verify a token symmetric
jwt.verify(token, secret, function(err, decoded) {

});
