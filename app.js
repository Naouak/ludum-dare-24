
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./application/routes')
  , http = require('http')
  , path = require('path');

var app = express();

var counter = require("./application/lib/counter.js").counter;



app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/application/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get("/counter", routes.counter);
app.get("/reset", routes.reset);
app.get("/connected", routes.connected);
app.get("/session", routes.session);
app.get("/sessionstart", routes.sessionstart);
app.post("/login", routes.login);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require("socket.io").listen(server);
var users = require("./application/lib/user.js");

io.of("/socket").on("connection",function(socket){
	var f = function(){
		socket.emit("reset");
	};
	users.stats.newUser();
	counter.event.on("reset",f);
	socket.on("disconnect", function(){
		counter.event.removeListener("reset",f);
		users.stats.removeUser();
	});
});
