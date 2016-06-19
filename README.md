# particle-logger
This is a simple tool to capture particle "publishes" and save them to a MongoDB database while exposing that data via a RESTful API for consumption. As long as this tool is running, any data published to your particle account stream (under your `access_token` and for specified event names) will be recorded. If you do not want to bother with a database and the web api, this tool can be run in a CSV-only mode to log published data to a CSV on disk.

## Installation
You must have nodejs and NPM installed. To install locally:

```bash
git clone https://github.com/suyashkumar/particle-logger.git
cd particle-logger
npm install
```

If you wish to log to a MongoDB database, ensure that MongoDB is set up and running. If you need to set the MongoDB URI you can set it in the `config/db.js` file or by setting the `MONGO_URI` environment variable.



## Config
Note--setting the access_token and event names will be able to be done via command-line args soon. 

Before logging, you must also place your Particle account's access_token in `config/config.json`. This can be found in the settings view on http://build.particle.io . It'll be something like:

```javascript
"access_token" : "c51b571312b04a6884cc03eeb08b365c8ace0b15",
```

List the names of events that you want to log in the events array in `config/config.json`. The event name is the first argument the `Particle.publish` command. For example in `Particle.publish("temp", "10F");`, "temp" is the event name. For example to log "temp" and "air_quality" events:

```javascript
  "events" : ["temps", "air_quality"]
```

## Logging 
To log in CSV-only mode:

```bash
node particle-log.js -c "test.csv"
```
To log to the MongoDB database and run the RESTful API server:

```bash
node particle-log.js
```
By default the server runs on port 9000. To change that, simple set the `PORT` environemt variable by: `export PORT=9001`

## RESTful API

* `/api/list`: Lists all records (for all events)
* `/api/list/:event_name`: Lists all records for the `event_name` event 

