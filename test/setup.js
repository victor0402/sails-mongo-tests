/**
 * Test starter
 */
var connect = require('../node_modules/sails-mongo/node_modules/mongodb').connect;

should = require('should');
request = require('supertest');
sinon = require('sinon');

isDone = function (done) {
	return function () {
		done()
	}
};

Sails = require('sails/lib/app');
app = Sails();

expect = require('chai').expect;

helper = require('./helper');
db = null;

var testConfig = {
	environment: 'test',
	port: 1337,
	log: {
		level: 'error'
	},
	connections: {
		testMongodbServer: {
			adapter: 'sails-mongo',
			host: 'localhost',
			port: 27017,
			user: '',
			password: '',
			database: 'sails-tests-dev'
		}
	},
	connection: 'testMongodbServer'
};

/**
 * Before ALL the test bootstrap the server
 */
before(function (done) {
	// start sails server and for tests and user the global sails variable
	app.lift(testConfig, function (err, sails) {
		if (err)
			done(err);
		else {
			buildDBConnection(function (err) {
				done(err, sails);
			})
		}
	});
});

function buildDBConnection(cb) {
	var databaseConfig = testConfig.connections.testMongodbServer;
	var stringConexao = 'mongodb://' + databaseConfig.host + ':' + databaseConfig.port + '/' + databaseConfig.database;

	connect(stringConexao, function (err, con) {
		db = con;
		cb(err)
	});
}

/**
 * After ALL the tests, lower sails
 */
after(function (done) {
	db.close();
	app.lower(done);
});
