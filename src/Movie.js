import React, {useState} from 'react'
import { FaThumbsUp, FaThumbsDown, FaAngleDown, FaAngleUp } from 'react-icons/fa';

  function Movie({movie, savedMovie, likedMovie, dislikedMovie}) {
    
    const [ show, setShow ] = useState(false)
    const [ movieData, setMovieData ] = useState([])
    
    const handleClick = (e) => {
      e.preventDefault()
      let movieId = movie.imdbID
      const params = {
        id: movieId
      }

      show === false ? (
        fetch("/movie", {
          params,
          method: "POST",
          body: JSON.stringify(params),
	        headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(object => {
	        console.log(object);
          setMovieData(object)
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
          <h2>Title <br/>
            <span>"{movie.Title}"</span>
          </h2>
          <p>Release Year <br/>
            <span>{movie.Year}</span>
          </p>

          {
           show === false ? (
            <button className="button" onClick={handleClick}>
              <FaAngleDown/>
            </button>
            ) : ( 
            <div>
              <p>Genre <br/>
                <span>{movieData.Genre}</span>
              </p>
              <p>Plot <br/>
                <span>{movieData.Plot}</span>
              </p>
              <p>Director <br/>
                <span>{movieData.Director}</span>
              </p>
              <p>Actors <br/> 
                <span>{movieData.Actors}</span>
              </p>
              <p>imdb Rating <br/> 
                <span>{movieData.imdbRating}</span>
              </p>
              <p>imdb Votes <br/> 
                <span>{movieData.imdbVotes}</span>
              </p>
              <p>
                <FaThumbsUp className="like-icon" onClick={() => likedMovie(movie)}/><span> {savedMovie ? savedMovie.likes : 0}</span>
             
                <FaThumbsDown className="dislike-icon" onClick={() => dislikedMovie(movie)}/><span> {savedMovie ? savedMovie.dislikes : 0}</span>
              </p>
              <button className="button" onClick={handleClick}>
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