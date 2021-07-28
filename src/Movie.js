import React, {useState} from 'react'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import apiKey from "./apiKey"

  function Movie({movie}) {

    const [ show, setShow ] = useState(false)
    const [ movieData, setMovieData ] = useState([])

    const [ movieLikes, setMovieLikes ] = useState(0)
    const [ movieDislikes, setMovieDislikes ] = useState(0)


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

          const item = localStorage.getItem(movie.imdbID)
          if (item) {
            const json = JSON.parse(item)
            setMovieLikes(json.likes)
            setMovieDislikes(json.dislikes)
          } 
        })
       .catch(err => {
	       console.error(err);
        })
      ) : (
        setShow(!show)
      ) 
    } 
    
    function increment() {
      const item = localStorage.getItem(movie.imdbID)
      let json = null
      if (item) {
        json = JSON.parse(item)
        json.likes += 1
      } else {
        json = {title: movie.Title, likes: 1, dislikes: 0}
      }
      localStorage.setItem(movie.imdbID, JSON.stringify(json))
      setMovieLikes(json.likes)
    }

    function decrement() {
      const item = localStorage.getItem(movie.imdbID)
      let json = null
      if (item) {
        json = JSON.parse(item)
        json.dislikes += 1
      } else {
        json = {title: movie.Title, likes: 0, dislikes: 1}
      }
      localStorage.setItem(movie.imdbID, JSON.stringify(json))
      setMovieDislikes(json.dislikes)
    }

    return (
      <div>
        <div className="card" onClick={handleClick}>Movie: {movie.Title}, {movie.Year}</div>

        {show && (
          <div>
            
            <p>Title: {movieData.Title}</p>
            <p>Genre: {movieData.Genre}</p>
            <p>Plot: {movieData.Plot}</p>
            <p>Director: {movieData.Director}</p>
            <p>Release Year: {movieData.Year} </p>
              <div className="like" onClick={increment}>
                <FaThumbsUp className="like-icon"/><span>{movieLikes}</span>
              </div>
            
              <div className="like" onClick={decrement}>
                <FaThumbsDown className="like-icon"/><span>{movieDislikes}</span>
              </div>
              
           </div>
        )
      }

      </div>
    )
  }
  

export default Movie