var userStats = function(){
	var count = 0;

	this.newUser = function(){
		count++;
	}
	this.removeUser = function(){
		count--;
	}
	this.getCount = function(){
		return count;
	}
};

exports.stats = new userStats();

var crypto = require("crypto"),
	shasum = crypto.createHash("sha1");




var user = function(n,p){
	var name = n;
	var password = p;

	this.getName = function(){
		return name;
	};

	this.hashPassword = function(password){
		return shasum(password);
	};

	this.testPassword = function(p){
		p = this.hashPassword(p);
		return p===password;
	};
};

var userFactory = function(){
	var users = {};

	this.hashPassword = function(password){
		return shasum(password);
	};

	this.getUserByName = function(name){
		return users[name];
	};

	this.createUser = function(name,password){
		users[name] = new User(name,this.hashPassword(password));
	};
}