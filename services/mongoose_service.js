const mongoose = require('mongoose');
const uri = 'mongodb://localhost/one_punch';
mongoose.Promise = global.Promise;

mongoose.connect(uri, {userMongoClient: true})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))

db.on('open', function() {
	console.log('connected!');
})