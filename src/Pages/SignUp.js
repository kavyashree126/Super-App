import React, { useState } from "react";
import "./SignUp.moduel.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Number: "",
    CheckBox: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Number: "",
    CheckBox: "",
  });

  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    if (!value == "") {
      setInput({ ...input, CheckBox: false });
    }
    // if (/^[0-9]*$/.test(input.Number)) {
    //   console.log(newPhoneNumber);
    // } else {
    //   console.log("error");
    // }
    setInput((prevValue) => {
      return {
        ...prevValue,
        [name]: newValue,
      };
    });
    if (name === "Name" && value.length > 5) {
      setErrorMessage({
        ...errorMessage,
        Name: "",
      });
    } else if (name === "UserName" && value.length > 5) {
      setErrorMessage({
        ...errorMessage,
        UserName: "",
      });
    } else if (name === "Email" && value.endsWith("@gmail.com")) {
      setErrorMessage({
        ...errorMessage,
        Email: "",
      });
    } else if (name === "Number" && value.length === 10) {
      setErrorMessage({
        ...errorMessage,
        Number: "",
      });
    }
  }
  function signUpHandler() {
    if (
      input.Name.length < 5 &&
      input.UserName.length < 5 &&
      !input.Email.endsWith("@gmail.com") &&
      input.Number.length < 10
    ) {
      setErrorMessage({
        Name: "Name must be at least 5 characters long.",
        UserName: "UserName must be at least 5 characters long.",
        Email: "Email must end with @gmail.com",
        Number: "Phone number must be 10 digits long",
      });
    }
  }
  function submitForm(event) {
    event.preventDefault();

    setInput({
      Name: "",
      UserName: "",
      Email: "",
      Number: "",
      CheckBox: false,
    });
    setErrorMessage({
      Name: "",
      UserName: "",
      Email: "",
      Number: "",
      CheckBox: "",
    });
    navigate("/categories");
    localStorage.setItem("User Details", JSON.stringify([input]));
    console.log(input);
  }
  return (
    <div className="container">
      <div className="leftDiv">
        </div>
      <div className="rightDiv">
        <form onSubmit={submitForm}>
          <div className="createAccountDiv">
            <h1>Super app</h1>
            <p>Create your new account</p>
            <div className="inputDiv">
              {/* <div> */}
              <input
                value={input.Name}
                minLength={5}
                required
                onChange={handleInput}
                name="Name"
                className="inputBox"
                placeholder="Name"
              ></input>
              {errorMessage ? (
                <p
                  style={{
                    color: "red",
                    margin: "0px",
                    marginTop: "10px",
                    fontSize: "18px",
                    paddingLeft: "20px",
                  }}
                >
                  {errorMessage.Name}
                </p>
              ) : (
                <p></p>
              )}
              <input
                value={input.UserName}
                minLength={5}
                required
                onChange={handleInput}
                name="UserName"
                className="inputBox"
                placeholder="UserName"
              ></input>
              {errorMessage ? (
                <p
                  style={{
                    color: "red",
                    margin: "0px",
                    marginTop: "10px",
                    fontSize: "18px",
                    paddingLeft: "20px",
                  }}
                >
                  {errorMessage.UserName}
                </p>
              ) : (
                <p></p>
              )}
              <input
                value={input.Email}
                onChange={handleInput}
                type="email"
                name="Email"
                pattern="[a-z0-9._%+-]+@gmail\.com$"
                required
                className="inputBox"
                placeholder="Email"
              ></input>
              {errorMessage ? (
                <p
                  style={{
                    color: "red",
                    margin: "0px",
                    marginTop: "10px",
                    fontSize: "18px",
                    paddingLeft: "20px",
                  }}
                >
                  {errorMessage.Email}
                </p>
              ) : (
                setErrorMessage("")
              )}

              <input
                value={input.Number}
                onChange={handleInput}
                type="number"
                inputmode="numeric"
                name="Number"
                pattern="[0-9]"
                minLength={10}
                maxLength={10}
                required
                className="inputBox"
                placeholder="Mobile Number"
              ></input>
              {errorMessage ? (
                <p
                  style={{
                    color: "red",
                    margin: "0px",
                    marginTop: "10px",
                    fontSize: "18px",
                    paddingLeft: "20px",
                  }}
                >
                  {errorMessage.Number}
                </p>
              ) : (
                <p></p>
              )}

              <div className="checkBoxDiv">
                <input
                  onChange={handleInput}
                  required
                  type="checkbox"
                  name="CheckBox"
                  checked={input.CheckBox}
                  value="Share my registration data with Superapp"
                ></input>

                <p>Share my registration data with Superapp</p>
              </div>

              <button className="signUpBtn" onClick={signUpHandler}>
                SignUp
              </button>

              <p>
                By clicking on Sign up. you agree to Superapp Terms and
                Conditions of Use
              </p>
              <p>
                To learn more about how Superapp collects, uses, shares and
                protects your personal data please head Superapp Privacy Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
