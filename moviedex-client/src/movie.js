import React from 'react';

function movie(props){
	return(
		<div>
			<h1> {props.movie.film_title} </h1>
			<h2> {props.movie.year} </h2>
			<h3> {props.movie.rating} </h3>
		</div>
		)
}

export default movie;