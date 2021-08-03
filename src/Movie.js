import React, {useState} from 'react'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
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
      <div>
        <div className="card">Movie: {movie.Title}, {movie.Year}
        <br/>
          <button style={{border: "none", background: "none"}} onClick={handleClick}>{show === false ? (<TiArrowSortedDown/>) : ("")}</button>
        {show && (
          <div>
            
            <p>Title: {movieData.Title}</p>
            <p>Genre: {movieData.Genre}</p>
            <p>Plot: {movieData.Plot}</p>
            <p>Director: {movieData.Director}</p>
            <p>Release Year: {movieData.Year} </p>
              <div className="like" onClick={() => likedMovie(movie)}>
                <FaThumbsUp className="like-icon"/><span>{savedMovie ? savedMovie.likes : 0}</span>
              </div>
            
              <div className="like" onClick={() => dislikedMovie(movie)}>
                <FaThumbsDown className="like-icon"/><span>{savedMovie ? savedMovie.dislikes : 0}</span>
              </div>
              <button style={{border: "none", background: "none"}} onClick={handleClick}><TiArrowSortedUp/></button>
          </div>
          )
        }
        </div>
      </div>
    )
  }
  

export default Movie