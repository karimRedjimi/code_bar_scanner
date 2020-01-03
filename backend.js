/*********************************************************************************************************
											CONSTANT VARIABLES
**********************************************************************************************************/
const express = require('express')
const BodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient

const app = express()

app.use(BodyParser.json({limit: '50mb'}));
app.use(BodyParser.urlencoded({limit: '50mb', extended: true }));

/*********************************************************************************************************
										AUTHENTICATION LOCAL
**********************************************************************************************************/
const config = {
	server_name: "mongodb+srv://karim:karim1234@cluster0-df2rs.mongodb.net/test?retryWrites=true&w=majority",
	database_name: "codebar_db",
	collection_name_wines: "wines",
	collection_name_users: "users"
}
const mongodb_server_url = config.server_name
const mongodb_database_name = config.database_name
const mongodb_collection_name = config.collection_name_wines

/*********************************************************************************************************
											MIDDLEWARES
**********************************************************************************************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

/*********************************************************************************************************
											ROUTES
**********************************************************************************************************/
app.get('/', (req, res) => res.send('Hello Worldddddddd!'))
app.get('/getInfo/:wineID', (req, res) => {
	var wineID = req.params.wineID
	console.log(wineID)
	var endResult = {}
	MongoClient.connect(mongodb_server_url, (err, db) => {
		if (err) {
			throw err
		}
		var dbo = db.db(mongodb_database_name)
		var query = {code_bar: wineID}
		dbo.collection(mongodb_collection_name).findOne(query, (err, result) => {
			if (err) {
				// HTTP status 404: NotFound
				res.status(404).send('Error connection to the DB');
				throw err
			} 
			console.log(result)
			db.close()
			if (result == null) {
				// HTTP status 404: NotFound
				res.status(404).send('Not found');
			} else {
				endResult = result
				res.json(endResult)
			}
		})
	})
})
//LOGIN ADMINISTRATEUR
app.get('/adminLogin/:adminID', (req, res) => {
	var adminID = req.params.adminID
	console.log(adminID)
	var endResult = {}
	MongoClient.connect(mongodb_server_url, (err, db) => {
		if (err) {
			throw err
		}
		var dbo = db.db(mongodb_database_name)
		var query = {username: adminID}
		dbo.collection("users").findOne(query, (err, result) => {
			if (err) {
				// HTTP status 404: NotFound
				res.status(404).send('Error connection to the DB');
				throw err
			} 
			console.log(result)
			db.close()
			if (result == null) {
				// HTTP status 404: NotFound
				res.status(404).send('Not found');
			} else {
				endResult = result
				res.json(endResult)
			}
		})
	})
})

//LOGIN USER
app.get('/userLogin/:userID', (req, res) => {
	var userID = req.params.userID
	console.log(userID)
	var endResult = {}
	MongoClient.connect(mongodb_server_url, (err, db) => {
		if (err) {
			throw err
		}
		var dbo = db.db(mongodb_database_name)
		var query = {username: userID}
		dbo.collection("users").findOne(query, (err, result) => {
			if (err) {
				// HTTP status 404: NotFound
				res.status(404).send('Error connection to the DB');
				throw err
			} 
			console.log(result)
			db.close()
			if (result == null) {
				// HTTP status 404: NotFound
				res.status(404).send('Not found');
			} else {
				endResult = result
				res.json(endResult)
			}
		})
	})
})



app.listen(7000);