var events = require("events");

var counter = function(){
	var counter = new Date();

	this.event = new events.EventEmitter();

	this.reset = function(){
		counter = new Date();
		this.event.emit("reset");
	};

	this.getValue = function(){
		return Math.round((new Date() - counter) / 1000);
	};
};

exports.counter = new counter();