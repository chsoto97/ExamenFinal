import React from 'react';

function add(props){

	function click(event){
		event.preventDefault();
		let url = 'http://localhost:8080/api/moviedex';
		let newMovie = {
			film_title : event.target.name.value,
			year : event.target.year.value,
			rating : event.target.rating.value
		}
		let settings = {
			method : "POST",
			body : JSON.stringify(newMovie),
			headers : {
				'Content-Type' : 'application/json'
			}
		}
		fetch(url, settings)
		.then((response) =>{
			if(response.ok){
				return response.json();
			}
		})
		.then((responseJSON)=>{
			props.method();
		})
		.catch((err) =>{
			throw Error(err);
		});
	}

	return(
		<div>
			<form id='addMovie' onSubmit={(event)=>click(event)}>
				<label htmlFor="title">Film name: </label>
				<input type="text" name="name"/>
				<label htmlFor="year">Film year: </label>
				<input type="number" name="year"/>
				<label htmlFor="rating">Film rating: </label>
				<input type="number" name="rating"/>
				<input type="submit"/>
			</form>
		</div>
		)
}

export default add;