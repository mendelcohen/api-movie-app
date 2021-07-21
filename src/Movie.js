import React, {useState} from 'react'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import apiKey from "./apiKey"
  function Movie({movie}) {

    const [ movieLikes, setMovieLikes ] = useState(0)
    const [ movieDislikes, setMovieDislikes ] = useState(0)
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
          setShow(!show)
        })
       .catch(err => {
	       console.error(err);
        })
      ) : (
        setShow(!show)
      ) 
    } 

    function increment() {
      setMovieLikes(prevMovieLikes => prevMovieLikes + 1)
    }

    function decrement() {
      setMovieDislikes(prevMovieDislikes => prevMovieDislikes + 1)
    }

    return (
      <div>
        <button onClick={handleClick}>Movie: {movie.Title}, {movie.Year}</button>

        {show && (
          <div>
            <p>Title: {movieData.Title}</p>
            <p>Genre: {movieData.Genre}</p>
            <p>Plot: {movieData.Plot}</p>
            <p>Director: {movieData.Director}</p>
            <p>Release Year: {movieData.Year} </p>
            <div className="like" onClick={() => increment()}>
              <FaThumbsUp className="like-icon"/><span>{movieLikes}</span>
            </div>
            <div className="like" onClick={() => decrement()}>
              <FaThumbsDown className="like-icon"/><span>{movieDislikes}</span>
            </div>
           </div>
        )
      }

      </div>
    )
  }
  

export default Movie
// {movieData.Title ? (
//   <div>
//   <p>Title: {movieData.Title}</p>
//   <p>Genre: {movieData.Genre}</p>
//   <p>Plot: {movieData.Plot}</p>
//   <p>Director: {movieData.Director}</p>
//   <p>Release Year: {movieData.Year} </p>
//   <div className="like" onClick={() => increment()}>
//     <FaThumbsUp className="like-icon"/><span>{movieLikes}</span>
//   </div>
//   <div className="like" onClick={() => decrement()}>
//     <FaThumbsDown className="like-icon"/><span>{movieDislikes}</span>
//   </div>
// </div>
// ) : (
//  <div></div>
// )

// }


// {show && (
//   <div>
//     <p>Title: {movie.Title}</p>
//     <p>Genre: {movie.Genre}</p>
//     <p>Plot: {movie.Plot}</p>
//     <p>Director: {movie.Director}</p>
//     <p>Release Year: {movie.Year} </p>
//     <div className="like" onClick={increment}>
//       <FaThumbsUp className="like-icon"/><span>{movieLikes}</span>
//     </div>
//     <div className="like" onClick={decrement}>
//       <FaThumbsDown className="like-icon"/><span>{movieDislikes}</span>
//     </div>
//   </div>
// )}

// movieData.Title ? 

// ) : (
//   <div></div>