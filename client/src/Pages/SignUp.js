import React from "react";
import axios from "axios";
import "../CSS/SignUp.css";

const SignUp = () => {
  return (
    <>
      <h1 className="SignUpText">Sign Up</h1>
      <div className="SignUpContainer">
        <div className="SignUpInputContainer">
          <input
            type="text"
            className="SignUpEmail"
            placeholder="Email"
          ></input>
          <input
            type="text"
            className="SignUpUsername"
            placeholder="Username"
          ></input>
          <input
            type="password"
            className="SignUpPassword"
            placeholder="Password"
          ></input>
        </div>
        <button className="SignUpBtn" onClick={signUp}>
          Sign Up
        </button>
        <div className="SignUpErrorMessageContainer">
            <p className = "SignUpErrorMessage"></p>
        </div>
      </div>
    </>
  );
};
export default SignUp;

function signUp() {
  const email = document.querySelector(".SignUpEmail").value;
  const username = document.querySelector(".SignUpUsername").value;
  const password = document.querySelector(".SignUpPassword").value;

  if (email.length  === 0 || username.length === 0 || password.length === 0) {
    alert("please make sure you fill out all the fields");
  }
  else signUpDatabase(username, password, email);
}


// attempt to create a new user in the database
async function signUpDatabase(username, password, email) {
  axios.post(`http://localhost:8000/users`,
  {
    username: `${username}`,
    password: `${password}`,
    email: `${email}`,
  })
    .then((res) => {
        console.log(res.data);
        // username already exists
        if (res.data === `error: duplicate key value violates unique constraint "accounts_username_key"`) {
            alert("that username already exists!")
        }
    })
    .catch((error) => console.log(error));
}
