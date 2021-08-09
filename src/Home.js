import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { GiSaloonDoors } from 'react-icons/gi'

const Home = (props) => {
  const history = useHistory()

  function handleEnter() {
    sessionStorage.setItem("showNav", true)
    props.setShowNav(sessionStorage.getItem("showNav"))
    history.push('/MovieApi')
  }

  return (
    <div className="welcome">
      <h1>Welcome to the Movie API Search App!</h1>
      <h2>Give a thumbs up <span><FaThumbsUp className="likes-icon"/></span> or a thumbs down <span><FaThumbsDown className="dislikes-icon"/></span> to your movies. </h2> 
      <h2>To begin your searches click on the doors and enter.</h2>
      <button onClick={handleEnter}><GiSaloonDoors/></button>
    </div>
  );
};
  
export default Home;