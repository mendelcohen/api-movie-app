import React, {useState} from 'react'
import apiKey from "key"
const MovieApi = () => {
  
  const [ movieName, setMovieName ] = useState([])

  function searchTitle() {
    console.log("searching...");
    // var input = document.getElementById("movie-name").value;
    // console.log(input);
    fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?s=spiderman&p=1", {
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

  return (
    <div>
      <h1>New Project</h1>
      <button onClick={() => searchTitle()}>Search</button>
      <h4>{
      movieName.map(movie => (
        <div key={movie.imdbID}>
          
          {movie.Title}
        </div>
      ))
      }</h4>
    </div>
  )
}

export default MovieApi