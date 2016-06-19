// Set up Express.js 

 var express = require('express');
 var app = express();
 var server = require('http').Server(app);
 var io = require('socket.io')(server);
 
 // Load libraries
 var bodyParser = require('body-parser');
 var morgan = require('morgan');
 var argv = require('minimist')(process.argv.slice(2)); 
 var CSVLogging = ("c" in argv);
 var CSVName = argv["c"];
 
 if (CSVLogging){
	console.log("CSV Logging to file " + CSVName + ". NOTE: No logs being added to MongoDB at this time and server is OFF");
 }
 
 // Set up logging
 app.use(morgan('dev'));
 
 // Set up body parsing
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 
 // Set up static content
 app.use(express.static(__dirname + '/node_modules')); // client-side frameworks
 app.use(express.static(__dirname + '/public')); // HTML, CSS
 
 // Set up favicon
 //app.use(favicon(__dirname + '/public/favicon.ico'));
 // Enable server and db connections only if CSV Logging is off (can always get a csv from the server if server is on)
 if (!CSVLogging){ 
 	// Connect to Mongodb
 	require('./config/db')();
	 // Set up app routes
	require('./config/routes')(app); 
	io.on('connection',function(socket){ 
 	}); 
	if (!module.parent) {
		var port = process.env.PORT || 9000; // 9000 as default
	 	// On Linux make sure you have root to open port 80
	 	server.listen(port, function() {
	 	console.log('Listening on port ' + port);
	 	});
 	}
	
 } 
 require('./handle-device.js')(CSVLogging, CSVName);
 exports = module.exports = app;

