var counter = function(){
	var counter = new Date();

	this.reset = function(){
		counter = new Date();
	};

	this.getValue = function(){
		return Math.round((new Date() - counter) / 1000);
	};
};

exports.counter = new counter();