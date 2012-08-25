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

var crypto = require("crypto");


var user = function(n,p){
	var name = n;
	var password = p;

	this.getName = function(){
		return name;
	};

	this.hashPassword = function(password){
		var shasum = crypto.createHash("sha1");
		shasum.update(password);
		return shasum.digest("hex");
	};

	this.testPassword = function(p){
		p = this.hashPassword(p);
		return p===password;
	};
};

var userFactory = function(){
	var users = {};

	this.hashPassword = function(password){
		var shasum = crypto.createHash("sha1");
		shasum.update(password);
		return shasum.digest("hex");
	};

	this.getUserByName = function(name){
		return users[name];
	};

	this.createUser = function(name,password){
		users[name] = new user(name,this.hashPassword(password));
	};

	this.isConnected = function(req){
		return req.session.user !== undefined;
	};

	this.getCurrentUser = function(req){
		if(this.isConnected(req)){
			return this.getUserByName(req.session.user);
		}
		else{
			return undefined;
		}
	}

}

exports.users = new userFactory();