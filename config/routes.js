var logs = require('../api/logs.js');
module.exports = function(app) {
 	app.get('/api/list', logs.list);
	app.get('/api/list/:name', logs.listEvent);
 
 }
