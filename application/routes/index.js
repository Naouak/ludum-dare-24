
/*
 * GET home page.
 */
var counter = require("../lib/counter.js").counter;


exports.index = function(req, res){
  res.render('index', { title: 'Naouak\'s Ludum dare 24' });
};

exports.counter = function(req,res){
	res.end(counter.getValue().toString());
}

exports.reset = function(req,res){
	counter.reset();
	res.end("1");
}

var user = require("../lib/user.js");
exports.connected = function(req,res){
	res.end(user.stats.getCount().toString());
}