import React, { useState, useEffect } from "react";
import "./background.css";

const Background = ({ isDinoJumping }) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
  // State to manage if the image is shown or not
  const [isImageShown, setImageShown] = useState(false);

  // Function to toggle the image display
  const toggleImage = () => {
    setImageShown(!isImageShown);
  };
  return (
    <div className="background">
      <div className="backgroundImage"></div>
      {/* <div className="dinosaur"></div> */}
      <div className={`dinosaur ${isDinoJumping ? "jump" : ""}`}></div>
      <div className="groundBackground1"></div>
      <div className="groundBackground2"></div>
      <div className="groundBackground3"></div>
      <div className="groundBackground4"></div>
      <div className="groundBackground5"></div>
      <div className="cloudSlow"></div>
      <div className="cloudFast"></div>
      <div className="egg"></div>
      <div className="sign"></div>
      <div className="guide-container">
        <h1>Rowdy Sign Language Guide!</h1>
        <p>Show your gesture on the camera and wait for a letter to pop up.</p>
        <p>
          Make sure you have <strong>good lighting!</strong>
        </p>
      </div>
      <div className="legend">
        <p>D</p>
        <p>N</p>
        <p>E</p>
        <p>G</p>
        <p>E</p>
        <p>L</p>
      </div>
    </div>
  );
};

export default Background;
