let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let {MovieList} = require('./model');
let morgan = require('morgan');

let app = express();

app.use(morgan('dev'));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

app.get('/api/moviedex', (req, res)=>{
	MovieList.getAll()
		.then((result) =>{
			return res.status(200).json(result);
		})
		.catch((err)=>{
			res.statusMessage = "No se pudo conectar a la base de datos."
			return res.status(500).send();
		});
});

app.post('/api/moviedex', jsonParser, (req, res) =>{
	let newMovie = req.body;
	if(newMovie.film_title&&newMovie.year&&newMovie.rating){
		MovieList.addMovie(newMovie)
			.then((result)=>{
				return res.status(201).json(result);
			})
			.catch((err)=>{
				res.statusMessage = "No se pudo conectar a la base de datos."
				return res.status(500).send();
			});
	} else {
		res.statusMessage = "Faltan parámetros"
		return res.status(406).send();
	}
});

let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}