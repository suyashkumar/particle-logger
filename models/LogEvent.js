/*
 * LogEvent.js
 * The schema (and model) to hold incoming events
 * @author: Suyash Kumar <suyashkumar2003@gmail.com>
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LogEvent  = new Schema({ 
	coreid:		 	{type: String, required: true, trim: true},  // coreid of sender 
	published_at:	{type: Date, required: true}, 
	data:			{type: String, required: true},
	name:			{type: String, required: true}
});
module.exports = mongoose.model('LogEvent', LogEvent);
