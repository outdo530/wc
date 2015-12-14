
var client = require('./client');

var crypto = require('crypto');
var text = "phoneNumber=15210943874&key=99999999";
var hasher=crypto.createHash("md5");
var md5key=hasher.digest('hex');

var user = {
	PhoneNumber: '15210943874',
	authKey: md5key
};


client.call("127.0.0.1", 3000, '/json', user);
