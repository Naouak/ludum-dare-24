
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

exports.session = function(req,res){
	res.end(JSON.stringify(req.session));
}

exports.sessionstart = function(req,res){
	req.session.foo = "bar";
	res.end();
}

exports.login = function(req,res){
	var user = req.body.user;
	var password = req.body.password;


}
