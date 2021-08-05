import React, {useState} from 'react'
import { FaThumbsUp, FaThumbsDown, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import apiKey from "./apiKey"

  function Movie({movie, savedMovie, likedMovie, dislikedMovie}) {

    const [ show, setShow ] = useState(false)
    const [ movieData, setMovieData ] = useState([])

    const handleClick = () => {
      show === false ? (
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
          setMovieData(response)
          setShow(true)
        })
       .catch(err => {
	       console.error(err);
        })
      ) : (
        setShow(false)
      ) 
    } 

    return (
      <div >
        <div className="card">
          <h3>Title: <br/>
            <span>"{movie.Title}"</span>
          </h3>
          <h4>Release Year: <br/>
            <span>{movie.Year}</span>
          </h4>

          {
           show === false ? (
            <button onClick={handleClick}>
              <FaAngleDown/>
            </button>
            ) : ( 
            <div>
              <p>Genre: <br/>
                <span>{movieData.Genre}</span>
              </p>
              <p>Plot: <br/>
                <span>{movieData.Plot}</span>
              </p>
              <p>Director: <br/>
                <span>{movieData.Director}</span>
              </p>
              <p>Actors: <br/> 
                <span>{movieData.Actors}</span>
              </p>
              <p>imdb Rating: <br/> 
                <span>{movieData.imdbRating}</span>
              </p>
              <p>imdb Votes: <br/> 
                <span>{movieData.imdbVotes}</span>
              </p>
              <p>
                <FaThumbsUp className="like-icon" onClick={() => likedMovie(movie)}/><span> {savedMovie ? savedMovie.likes : 0}</span>
             
                <FaThumbsDown className="dislike-icon" onClick={() => dislikedMovie(movie)}/><span> {savedMovie ? savedMovie.dislikes : 0}</span>
              </p>
              <button onClick={handleClick}>
                <FaAngleUp/>
              </button>
            </div>
            )
          }
          
        </div>
      </div>
    )
  }
  

export default Movie