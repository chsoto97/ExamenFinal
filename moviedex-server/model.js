let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let movieCollection = mongoose.Schema({
	film_ID: String,
	film_title: String,
	year: Number,
	rating: Number
});

let Movie = mongoose.model('movies', movieCollection);

let MovieList = {
	getAll : function(){
		return Movie.find()
			.then((result)=>{
				return result;
			})
			.catch((err)=>{
				throw Error(err);
			})
	},
	addMovie : function(movie){
		movie.film_ID = uuid.v4();
		return Movie.create(movie)
			.then((result)=>{
				return movie;
			})
			.catch((err)=>{
				throw Error(err);
			})
	}
}

module.exports = {
    MovieList
};