import React, { useEffect, useState } from "react";
import "./Home_page.moduel.css";
import profile from ".././images/profile.png";

const Home_Page = () => {
  const [movieAction, setmovieAction] = useState();
  const [movieHorror, setmovieHorror] = useState();
  const [movieThriller, setmovieThriller] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=2f1d522f9a87d7458baceea9a5184900&with_genres=28"
      );
      const response2 = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=2f1d522f9a87d7458baceea9a5184900&with_genres=53"
      );
      const response3 = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=2f1d522f9a87d7458baceea9a5184900&with_genres=27"
      );

      const movieData = await response.json();
      const movieData2 = await response2.json();
      const movieData3 = await response3.json();
      setmovieAction(movieData.results);
      setmovieHorror(movieData2.results);
      setmovieThriller(movieData3.results);
    }

    fetchData();
  }, []);
  console.log(movieAction);
  console.log(movieHorror);
  console.log(movieThriller);
  return (
    <div>
      <div className="mainDiv">
        <div className="topBar">
          <p>Super App</p>
          <img src={profile}></img>
        </div>
        <div className="entertainmentDiv">
          <p>Entertainment according to your choice</p>
        </div>
      </div>
      <p className="category">Action</p>
      <div class="movie-slider-Div">
        {movieAction ? (
          movieAction.map((data) => (
            <div class="movie-card">
              <img
                class="movie-poster"
                src={"https://image.tmdb.org/t/p/original" + data.poster_path}
              ></img>
            </div>
          ))
        ) : (
          <p>Loading data</p>
        )}
      </div>
      <p className="category">Thriller</p>

      <div class="movie-slider-Div">
        {movieHorror ? (
          movieHorror.map((data) => (
            <div class="movie-card">
              <img
                class="movie-poster"
                src={"https://image.tmdb.org/t/p/original" + data.poster_path}
              ></img>
            </div>
          ))
        ) : (
          <p>Loading data</p>
        )}
      </div>
      <p className="category">Horror</p>

      <div class="movie-slider-Div">
        {movieThriller ? (
          movieThriller.map((data) => (
            <div class="movie-card">
              <img
                class="movie-poster"
                src={"https://image.tmdb.org/t/p/original" + data.poster_path}
              ></img>
            </div>
          ))
        ) : (
          <p>Loading data</p>
        )}
      </div>
    </div>
  );
};

export default Home_Page;
