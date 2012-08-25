
/*
 * GET home page.
 */
var counter = require("../lib/counter.js").counter;
var user = require("../lib/user.js");

exports.index = function(req, res){
  res.render('index', { title: 'Naouak\'s Ludum dare 24', connected: user.users.isConnected(req) });
};

exports.counter = function(req,res){
	res.end(counter.getValue().toString());
}

exports.reset = function(req,res){
	if(user.users.isConnected(req)){
		counter.reset();
		res.end("1");
	}
	else{
		res.end("0");
	}
}

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
	var username = req.body.user;
	var password = req.body.password;
	var o = user.users.getUserByName(username);
	if(o !== undefined && o.testPassword(password)){
		//connection successful
		req.session.user = username;
		res.render("success");
	}
	else if(o !== undefined){
		res.render("wrong");
	}
	else{
		user.users.addUser(username,password);
		req.session.user = username;
		res.render("success");
	}
}
