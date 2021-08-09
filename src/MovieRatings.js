import React from 'react'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

const MovieRatings = (props) => {
  return (
    <div>
      <h1>
        {
         Object.keys(props.db).length > 0 ? (
          "Movie Ratings"
          ) : (
          "Be the first to rate a movie"
         )
        }
      </h1>
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
      </table>
    </div>
  )
}

export default MovieRatings