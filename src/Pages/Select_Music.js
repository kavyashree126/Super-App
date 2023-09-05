import React, { useState } from "react";
import "./Select_Music.moduel.css";
import { useNavigate } from "react-router-dom";
import Action from ".././images/Action.png";
import Drama from ".././images/Drama.png";
import Romance from ".././images/Romance.png";
import Thriller from ".././images/Thriller.png";
import Western from ".././images/Western.png";
import Horror from ".././images/Horror.png";
import Fantasy from ".././images/Fantasy.png";
import Music from ".././images/Music.png";
import Fiction from ".././images/Fiction.png";
const Select_Music = () => {
  const [newArray, setNewArray] = useState([]);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  let arr = [
    {
      id: 1,
      color: "#FF5209",
      text: "Action",
      image: Action,
    },
    {
      id: 2,
      color: "#D7A4FF",

      text: "Drama",
      image: Drama,
    },
    {
      id: 3,
      color: "#11B800",
      text: "Romance",
      image: Romance,
    },
    {
      id: 4,
      color: "#84C2FF",

      text: "Thriller",
      image: Thriller,
    },
    {
      id: 5,
      color: "#902500",
      text: "Western",
      image: Western,
    },
    {
      id: 6,
      color: "#7358FF",

      text: "Horror",
      image: Horror,
    },
    {
      id: 7,
      color: "#FF4ADE",

      text: "Fantasty",
      image: Fantasy,
    },
    {
      id: 8,
      color: "#E61E32",

      text: "Music",
      image: Music,
    },
    {
      id: 9,
      color: "#6CD061",

      text: "Fiction",
      image: Fiction,
    },
  ];

  function handleClick(e) {
    if (!clicked) {
      setClicked(true);
    }
    if (newArray.includes(e)) {
      setNewArray(newArray.filter((i) => i !== e));
    } else {
      setNewArray([...newArray, e]);

      console.log(setNewArray);
      console.log(newArray);
    }
  }
  function dltBtnClick(btn) {
    const newMusicArray = newArray.filter((music) => music !== btn.target.id);
    setNewArray(newMusicArray);
  }

  function nextBtnHandler() {
    // event.preventDefault();

    if (!newArray.length == 0) {
      localStorage.setItem("Select Music", JSON.stringify(newArray));
      navigate("/Dashboard");
    } else {
      alert("Please select at least one Music Category");
    }
  }

  return (
    <div className="Container">
      <div className="leftContainer">
        <p className="aaa">Super app</p>
        <h1>
          Choose your <br /> entertainment <br /> category
        </h1>
        <div className="category">
          {newArray.map((music) => (
            <div className="categoryInnerDiv">
              <p>{music}</p>
              <p id={music} onClick={dltBtnClick} className="delete">
                X
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="rightContainer">
        <div class="row">
          {arr.map((image) => (
            <div
              id={image.id}
              name={image.text}
              onClick={() => handleClick(image.text)}
              style={{ backgroundColor: image.color }}
              class="column buttonShadow {pickerHover}"
            >
              <div class="card">
                <div className="textDiv">
                  <p>{image.text}</p>
                </div>

                <img src={image.image}></img>
              </div>
            </div>
          ))}
        </div>
        <div className="nextBtnDiv">
          <button onClick={nextBtnHandler} className="nextBtn">
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Select_Music;
