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
      {/* <h1>Movie Ratings</h1>
      <table className="table">
        <thead>
          <tr >
            <td className="table-head" id="title">Movie Title</td>
            <td className="table-head">Likes &nbsp;&nbsp;<FaThumbsUp className="likes-icon"/></td>
            <td className="table-head">Dislikes &nbsp;&nbsp;<FaThumbsDown className="dislikes-icon"/></td>
          </tr>
        </thead>
        <tbody>
          {
           Object.keys(props.db).map(key => (
            <tr key={key}>
              <td className="movie">{props.db[key].title}</td>
              <td className="rating">{props.db[key].likes}</td>
              <td className="rating">{props.db[key].dislikes}</td>
            </tr>
           ))
          }
        </tbody>
      </table> */}

      <h2>Search for a movie and rate it</h2>
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