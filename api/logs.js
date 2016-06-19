/*
 * logs.js
 * Module to hold all API functions dealing with logs
 * @author: Suyash Kumar <suyashkumar2003@gmail.com>
 */

var LogEvent = require('../models/LogEvent.js');

module.exports = {
	list: function(req,res){
		LogEvent.find({}, function(err, records){
			if (err) res.send(err);
			res.json(records);
		});
	},
	listEvent: function(req,res){
		LogEvent.find({name: req.params.name}, function(err, records){
			if (err) res.send(err);
			res.json(records);
		});
	}
}






