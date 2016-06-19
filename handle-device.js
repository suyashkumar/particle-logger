/*
 * handle-device.js
 * This module handles listening to the particle device stream and saving received data
 * in real time to the database (LogEvent models). It also has capability to send push 
 * notifications to clients using socketio when new packages arrive. 
 * @author: Suyash Kumar <suyashkumar2003@gmail.com>
 */
var EventSource = require('eventsource'); // Pull in event source
var LogEvent = require('./models/LogEvent.js');
var config = require('./config/config.json'); 

module.exports = function(){
	var es = new EventSource("https://api.particle.io/v1/devices/events?access_token="+config.access_token); // Listen to the stream 
	for (index in config.events){
		es.addEventListener(config.events[index],function(message){ handleEvent(message, config.events[index]) });
	}
} 

function handleEvent (message, eventName) {
	console.log("New Message");
	realData = JSON.parse(message.data);
	console.log(realData)
	realData.name = eventName;
	addRecord(realData); 
} 

function addRecord(data){
	var toAdd= {
		coreid:			data.coreid,
		published_at:	new Date(data.published_at), 
		probeid:		data.probeid,
		data:			data.data,
		name:			data.name
	}
	console.log(toAdd);
	var newRecord = new LogEvent(toAdd);  
	newRecord.save(function(err,event){
		if(err) console.log("error in saving to database"+err);
	})
	// io.emit(data.probeid,newRecord);
}
