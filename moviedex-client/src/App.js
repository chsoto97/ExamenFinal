import React from 'react';
import './App.css';
import Movie from './movie';
import Add from './add';


class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      url : 'http://localhost:8080/api/moviedex',
      peliculas : []
    }
  }

  componentDidMount(){
    let settings = {
      method : "GET"
    }
    fetch('http://localhost:8080/api/moviedex', settings)
      .then((response) =>{
        if(response.ok){
          return response.json();
        }
      })
      .then((responseJSON)=>{
        let listaNueva = [...this.state.peliculas, responseJSON];
        this.setState({
          peliculas : listaNueva[0]
        });
      })
      .catch((err)=>{
        throw Error(err);
      });
  }

  render(){
    return (
      <div>
        <Add method={this.componentDidMount}/>
        {this.state.peliculas.map((element, index)=>{
          return(
              <Movie movie={element} key={index}/>
            )
        })}
      </div>
    );
  }
}

export default App;
