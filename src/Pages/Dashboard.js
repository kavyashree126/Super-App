import React, { useEffect, useState } from "react";
import "./Dashboard.moduel.css";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import profile from ".././images/profile.png";
import wind from ".././images/wind.png";
import pressure from ".././images/pressure.png";
import humidity from ".././images/humidity.png";
import edit from ".././images/edit.png";
import timerButton from ".././images/timerButton.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const [music, setMusic] = useState();
  const [userData, setUserData] = useState();
  const [weather, setWeather] = useState();
  const [DisableBtn, setDisableBtn] = useState(false);
  const [countBtnDisable, setcountBtnDisable] = useState(true);
  const [showNotes, setshowNotes] = useState();
  const [isTextAreaEnabled, setIsTextAreaEnabled] = useState(false);
  const [pointerEvents, setPointerEvents] = useState("auto");
  const [increaseHours, setincreaseHours] = useState(0);
  const [increaseMinutes, setincreaseMinutes] = useState(0);
  const [increaseSeconds, setincreaseSeconds] = useState(0);
  const [increaseHoursset, setincreaseHoursset] = useState(0);
  const [increaseMinutesset, setincreaseMinutesset] = useState(0);
  const [increaseSecondsset, setincreaseSecondsset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const liveTime = new Date();
  var hours = liveTime.getHours(),
    minutes = liveTime.getMinutes(),
    ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  var Time = hours + ":" + minutes + " " + ampm;
  const date = 
    liveTime.getDate() +
    "-" +
    liveTime.getMonth() +
    "-" +
    liveTime.getFullYear();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=c4698d6c956642ad88f170949232602&q=Mumbai&aqi=no"
      );
      let data = localStorage.getItem("Notes");

      const musicData = await localStorage.getItem("Select Music");
      const userSavedata = await localStorage.getItem("User Details");
      if (musicData && userSavedata) {
        setMusic(JSON.parse(musicData));
        setUserData(JSON.parse(userSavedata));
      } else {
        console.error("error");
      }
      if (data) {
        data = data.replace(/['"]+/g, "");
        setshowNotes(data);
        console.log(data + "1");
      } else {
        localStorage.setItem("Notes", JSON.stringify("This is how i am going to learn MERN Stack in next 3 months."));

        setshowNotes("This is how i am going to learn MERN Stack in next 3 months.");
      }
      const Weatherdata = await response.json();
      setWeather([Weatherdata]);
    }

    fetchData();
  }, []);

  function dltBtnClick(btn) {
    if (music.length > 1) {
      const newMusicArray = music.filter((music) => music !== btn.target.id);
      setMusic(newMusicArray);
      localStorage.setItem("Select Music", JSON.stringify(newMusicArray));
    } else {
      alert("You can't remove all music");
    }
  }

  function textAreaHandle(e) {
    if (e.target.value === "") {
      localStorage.removeItem("Notes");
    } else {
      localStorage.setItem("Notes", JSON.stringify(e.target.value));
    }
  }

  function timeIncreaseHnadle(e) {
    if (e.target.id === "1") {
      setDisableBtn(true);

      if (increaseHours < 23) {
        setincreaseHours(increaseHours + 1);
      } else {
        setincreaseHours(0);
      }
      if (increaseHours >= 0) {
        setDisableBtn(true);
      } else if (increaseHours < 1) {
        setDisableBtn(false);
      }
    } else if (e.target.id === "2") {
      if (increaseMinutes < 59) {
        setincreaseMinutes(increaseMinutes + 1);
      } else {
        setincreaseMinutes(0);
      }
    } else if (e.target.id === "3") {
      if (increaseSeconds < 59) {
        setincreaseSeconds(increaseSeconds + 1);
      } else {
        setincreaseSeconds(0);
      }
    } else if (e.target.id === "4") {
      if (increaseHours === 0) {
        setincreaseHours(0);
      } else {
        setincreaseHours(increaseHours - 1);
      }
    } else if (e.target.id === "5") {
      if (increaseMinutes === 0) {
        setincreaseMinutes(0);
      } else {
        setincreaseMinutes(increaseMinutes - 1);
      }
    } else if (e.target.id === "6") {
      if (increaseSeconds === 0) {
        setincreaseSeconds(0);
      } else {
        setincreaseSeconds(increaseSeconds - 1);
      }
    }

    if (increaseHours >= 0 || increaseMinutes >= 0 || increaseSeconds >= 0) {
      setDisableBtn(true);
    } else if (
      increaseHours <= 1 ||
      increaseMinutes <= 1 ||
      increaseSeconds <= 1
    ) {
      setDisableBtn(false);
    }
  }
  const renderTime = ({ remainingTime }) => {
    let seconds = Math.floor(remainingTime % 60);
    let minutes = Math.floor((remainingTime / 60) % 60);
    let hour = Math.floor(remainingTime / 3600);
    if (remainingTime === 0) {
      setPointerEvents("auto");
      setincreaseHoursset(0);
      setincreaseMinutesset(0);
      setincreaseSecondsset(0);
    } else {
      setDisableBtn(false);
      setcountBtnDisable(false);
    }

    return (
      <div className="timer">
        <div className="text"></div>
        <div className="liveTimer">
          {hour < 10 ? (
            <div className="value">{"0" + hour}</div>
          ) : (
            <div className="value">{hour}</div>
          )}
          <div>:</div>
          {minutes < 10 ? (
            <div className="value">{"0" + minutes}</div>
          ) : (
            <div className="value">{minutes}</div>
          )}
          <div>:</div>
          {seconds < 10 ? (
            <div className="value">{"0" + seconds}</div>
          ) : (
            <div className="value">{seconds}</div>
          )}
        </div>
      </div>
    );
  };
  function timerStartHandler() {
    setPointerEvents("none");
    setDisableBtn(false);
    setIsPlaying(true);
    setincreaseHours("00");
    setincreaseMinutes("00");
    setincreaseSeconds("00");

    setincreaseHoursset(increaseHours);
    setincreaseMinutesset(increaseMinutes);
    setincreaseSecondsset(increaseSeconds);
    setincreaseHours(increaseHours);
    setincreaseMinutes(increaseHours);
    setincreaseSeconds(increaseHours);
  }

  function textareaEitButton() {
    setIsTextAreaEnabled(true);
  }

  function browserClickHandler() {
    navigate("/Home");
  }
  console.log(weather);
  return (
    <div className="parentDivision">
      <div className="LeftDiv">
        <div className="LeftInnerDivFirst">
          <div className="LeftInnerDivFirstFirst">
            <div className="LeftInnerDivFirstInnerDiv">
              <div className="userDetailsCard">
                <img src={profile}></img>
                <div className="userDetais">
                  {userData ? (
                    userData.map((data) => (
                      <div>
                        <p>{data.Name}</p>
                        <p>{data.Email}</p>
                        <p>{data.UserName}</p>
                      </div>
                    ))
                  ) : (
                    <p>Loading data</p>
                  )}
                  <div className="userSelectMusic">
                    {music ? (
                      music.map((musicData) => (
                        <div className="userSelectMusicInnerDiv">
                          <p>{musicData}</p>
                          
                        </div>
                      ))
                    ) : (
                      <p>Loading data</p>
                    )}
                  </div>
                </div>
              </div>
              {weather ? (
                weather.map((data) => (
                  <div className="weatherDiv">
                    <div className="dateTime">
                      <p>{date}</p>
                      <p>{Time}</p>
                    </div>
                    {/* <div>|</div> */}
                    <div className="weatherInnerDiv">
                      <div className="cloud">
                        <img src={data.current.condition.icon}></img>
                        <p>{data.current.condition.text}</p>
                      </div>
                      <div className="weatherWhiteLine"></div>

                      <div className="tempreature">
                        <p>{data.current.temp_c}°C</p>
                        <div className="pressure">
                          <img src={pressure}></img>
                          <p>
                            {data.current.pressure_mb} <br /> Pressure
                          </p>
                        </div>
                      </div>
                      <div className="weatherWhiteLine"></div>

                      <div className="wind">
                        <div className="windSpeed">
                          <img src={wind}></img>
                          <p>
                            {data.current.wind_kph} km/h <br /> Wind
                          </p>
                        </div>
                        <div className="humidity">
                          <img src={humidity}></img>
                          <p>
                            {data.current.humidity}
                            <br />
                            Humidity
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading data</p>
              )}
            </div>
            {showNotes ? (
              <div className="notePad">
                <p>All Notes</p>
                {/* {isTextAreaEnabled && ( */}
                <textarea
                  onChange={textAreaHandle}
                  readOnly={!isTextAreaEnabled}
                  className="textBox"
                >
                  {showNotes}
                </textarea>
                {/* )} */}

                <div className="editButtonDiv">
                  <button className="editButton" onClick={textareaEitButton}>
                    <img src={edit}></img>
                  </button>
                </div>
              </div>
            ) : (
              <p>Loading</p>
            )}
          </div>
        </div>
        <div className="LeftInnerDivSecond">
          <div className="timerDiv">
            <CountdownCircleTimer
              className="timerCircle"
              // isPlaying
              isPlaying={isPlaying}
              key={key}
              duration={
                increaseHoursset * 3600 +
                increaseMinutesset * 60 +
                increaseSecondsset
              }
              colors={"#FF6A6A"}
              onComplete={() => {
                setKey((prevKey) => prevKey + 1);
                // setIsPlaying(false);
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="HourParentDiv">
            <div className="hourDiv">
              <div className="hourDivInner">
                <p>Minutes</p>
                <img
                  className="timerChangeImage"
                  onClick={timeIncreaseHnadle}
                  id="1"
                  src={timerButton}
                  style={{ pointerEvents: pointerEvents }}
                  disabled={!countBtnDisable}
                ></img>
                {increaseHours < 10 ? (
                  <p className="time">{"0" + increaseHours}</p>
                ) : (
                  <p className="time">{increaseHours}</p>
                )}
                <img
                  className="timerChangeImage"
                  onClick={timeIncreaseHnadle}
                  style={{ pointerEvents: pointerEvents }}
                  id="4"
                  src={timerButton}
                  disabled={!countBtnDisable}
                ></img>
              </div>
              <div className="lineDiv">:</div>
              <div className="hourDivInner">
                <p>Minutes</p>
                <img
                  className="timerChangeImage"
                  onClick={timeIncreaseHnadle}
                  id="2"
                  src={timerButton}
                  style={{ pointerEvents: pointerEvents }}
                  disabled={!countBtnDisable}
                ></img>
                {increaseMinutes < 10 ? (
                  <p className="time">{"0" + increaseMinutes}</p>
                ) : (
                  <p className="time">{increaseMinutes}</p>
                )}
                <img
                  className="timerChangeImage"
                  onClick={timeIncreaseHnadle}
                  style={{ pointerEvents: pointerEvents }}
                  id="5"
                  src={timerButton}
                  disabled={!countBtnDisable}
                ></img>
              </div>
              <div className="lineDiv">:</div>

              <div className="hourDivInner">
                <p>Seconds</p>
                <img
                  className="timerChangeImage"
                  onClick={timeIncreaseHnadle}
                  style={{ pointerEvents: pointerEvents }}
                  id="3"
                  src={timerButton}
                  disabled={!countBtnDisable}
                ></img>
                {increaseSeconds < 10 ? (
                  <p className="time">{"0" + increaseSeconds}</p>
                ) : (
                  <p className="time">{increaseSeconds}</p>
                )}
                <img
                  disabled={!countBtnDisable}
                  className="timerChangeImage"
                  onClick={timeIncreaseHnadle}
                  style={{ pointerEvents: pointerEvents }}
                  id="6"
                  src={timerButton}
                ></img>
              </div>
            </div>
            <button
              onClick={timerStartHandler}
              disabled={!DisableBtn}
              className="startButton"
            >
              Start
            </button>
          </div>
        </div>
      </div>
      <div className="RightParentDiv">
        <div className="RightDiv">
          <div className="climbDiv">
            {/* <img src={mountain}></img> */}

            <p className="climb">Want to climb Mount Everest?</p>
            <div className="date">
              <p>{date}</p>
              <p>{Time}</p>
            </div>
            <div className="climatePeraDiv">
              <p className="climatePera">
                In the years since human beings first reached the summit of
                Mount Everest in 1953, climbing the world’s highest mountain has
                changed dramatically. Today, hundreds of mountaineers manage the
                feat each year thanks to improvements in knowledge, technology,
                and the significant infrastructure provided by commercially
                guided expeditions that provide a veritable highway up the
                mountain for those willing to accept both the......
              </p>
            </div>
          </div>
        </div>
        <div className="browseBtnDiv">
          <button className="browseBtn" onClick={browserClickHandler}>
            Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
