import React, {useState} from 'react'
import apiKey from "./apiKey"

const MovieApi = () => {
  const [ name, setName ] = useState()
  const [ movieName, setMovieName ] = useState([])

  const searchTitle = (e) => {
    e.preventDefault()
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${name}&p=1`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        var data = response.Search;
        console.log(data);
        data.map(() => (
          setMovieName(data)
        ));
      })
      .catch(err => {
        console.error(err);
      });
  }
  
  const searchMovie = (movie) => {
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${movie.imdbID}`, {
	    "method": "GET",
	    "headers": {
	   	  "x-rapidapi-key": apiKey,
		    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
	    }
    })
      .then(response => response.json())
      .then(response => {
	    console.log(response);
      })
     .catch(err => {
	     console.error(err);
      });
  }

  function handleChange(e) {
    const {value} = e.target
    setName(value)
  }

  return (
    <div>
      <h1>New Project</h1>
      <form onSubmit={searchTitle}>
      
      <input 
        type="text"
        name="name"
        placeholder="Search Movie Title"
        value={name}
        onChange={handleChange}
        />
        <button >Search</button>
      
      </form>
      <h4>{
      movieName.map(movie => (
        <div key={movie.imdbID}>
          <button onClick={() => searchMovie(movie)}>Movie: {movie.Title}, {movie.Year}</button>
          
        </div>
      ))
      }</h4>
    </div>
  )
}

export default MovieApi
// onClick={() => searchTitle(name)}