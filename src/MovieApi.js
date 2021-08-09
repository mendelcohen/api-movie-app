import React, {useState} from 'react'
import apiKey from "./apiKey"
import Movie from "./Movie"

const MovieApi = (props) => {
  const [ searchName, setSearchName ] = useState("")
  const [ movieResults, setMovieResults ] = useState([])
  
  const searchTitle = (e) => {
    e.preventDefault()
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${searchName}&p=1`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        const data = response.Search
        data ? setMovieResults(data) : setMovieResults("No Results Found")
      })
      .catch(err => {
        console.error(err);
      });
    }

  function handleChange(e) {
    const {value} = e.target
    setSearchName(value)
  }
  
  return (
    <div>
      <h2>
        {
         Object.keys(props.db).length > 0 ? (
          "Search for a movie and rate it"
          ) : (
          "Be the first to rate a movie"
         )
        }
      </h2>
      <form onSubmit={searchTitle}>
        <input 
          type="text"
          name="searchName"
          placeholder="Search Movie Title"
          value={searchName}
          onChange={handleChange}
        />
        <button>Search</button>
      </form>
      <br/>
      {
       movieResults === "No Results Found" ? (
        <div id="no-results">{movieResults}</div>
        ) : (
        <div className="cards" >
          {
           movieResults.map(movie => (
            <Movie movie={movie} 
              key={movie.imdbID} 
              savedMovie={props.db[movie.imdbID]} 
              likedMovie={props.likedMovie}
              dislikedMovie={props.dislikedMovie}
            />
           ))
          }
        </div>
        )
      }  
    </div>
  )
}

export default MovieApi