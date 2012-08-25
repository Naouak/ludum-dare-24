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