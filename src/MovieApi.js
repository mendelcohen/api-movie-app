import React, {useState, useEffect} from 'react'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import apiKey from "./apiKey"

import Movie from "./Movie"

const MovieApi = () => {
  const [ name, setName ] = useState("")
  const [ movieName, setMovieName ] = useState([])
  const [ storage, setStorage ] = useState([])
  
  
  useEffect(() => {
    let storageArray = []
    let localStorageArray = Object.values(localStorage)
    storageArray = localStorageArray.map(item => {
      const json = JSON.parse(item)
      return json
  })
    
    console.log(storageArray)
    setStorage(storageArray)
  }, [])
  
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
        setMovieName(data)
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
     
      <h1 style={{textAlign: "center"}}>Movie Ratings</h1>
      <table className="table">
      <thead>
       
          <tr >
            <td className="table-head" id="title">Movie Title</td>
            <td className="table-head" id="likes">Likes<br/><FaThumbsUp className="like-icon"/></td>
            <td className="table-head" id="dislikes">Dislikes<br/><FaThumbsDown className="like-icon"/></td>
          </tr>
        
        </thead>
        <tbody>
          {
           storage.map(item => (
            <tr key={item.title}>
              <td className="movie">{item.title}</td>
              <td className="rating">{item.likes}</td>
              <td className="rating">{item.dislikes}</td>
            </tr>
           ))
          
          }
        </tbody>
      </table>

      <h1 style={{textAlign: "center"}}>Rate Your Movies Here</h1>
      
      <form style={{textAlign: "center"}} onSubmit={searchTitle}>
      
      <input 
        type="text"
        name="name"
        placeholder="Search Movie Title"
        value={name}
        onChange={handleChange}
        />
        <button >Search</button>
        
      </form>
      {/* <h4 style={{display: "grid",  gridTemplateColumns: "auto auto auto auto", textAlign: "center"}}> */}
        {
         movieName === undefined ? (<p style={{textAlign: "center"}}>"No Results"</p>) : (
          <h4 style={{display: "grid",  gridTemplateColumns: "auto auto auto auto", textAlign: "center"}}>
            {
         movieName.map(movie => (
          <Movie  movie={movie} key={movie.imdbID}/>
         ))
}
         </h4>
         )
        }
      {/* </h4> */}
      
    </div>
  )
}

export default MovieApi