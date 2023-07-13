import React from "react";
import "../CSS/SignIn.css";

const SignIn = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  localStorage.setItem("cards loaded", JSON.stringify("false"));
  return (
    <>
      <h1 className="sign-in-text">Sign In</h1>
      <div className="sign-in-container">
        <div className="sign-in-input-container">
          <div className="input-container">
            <h4>Username</h4>
            <input
              type="text"
              className="username-input"
              placeholder="Username"
            ></input>
          </div>

          <div className="input-container">
            <h4>Password</h4>
            <input
              type="password"
              className="password-input"
              placeholder="Password"
            ></input>
          </div>
        </div>

        <button className="sign-in-btn" onClick={signIn}>
          Sign In
        </button>

        <div className="sign-in-error-message-container">
          <p className="sign-in-error-message hide">test</p>
        </div>

        <a className="sign-up-link" href="./SignUp">
          Sign Up
        </a>
      </div>
    </>
  );
};
export default SignIn;

// prevent multiple queries to the db with the same invalid username(s)
let invalidUsernames = [];

function signIn() {
  const username = document.querySelector(".username-input").value;
  const password = document.querySelector(".password-input").value;
  const errorMessage = document.querySelector(".sign-in-error-message");

  if (username.length === 0 || username.indexOf(" ") !== -1) {
    errorMessage.innerHTML = `Please make sure you enter a valid username`;
    errorMessage.classList.remove("hide");
    setTimeout(() => {
      errorMessage.classList.add("hide");
    }, 2500);
  } else if (password.length === 0 || password.indexOf(" ") !== -1) {
    errorMessage.innerHTML = `Please make sure you enter a valid password`;
    errorMessage.classList.remove("hide");
    setTimeout(() => {
      errorMessage.classList.add("hide");
    }, 2500);
  } else {
    if (invalidUsernames.indexOf(username) === -1)
      checkSignIn(username, password);
    else {
      errorMessage.innerHTML = `That username does not exist`;
      errorMessage.classList.remove("hide");
      setTimeout(() => {
        errorMessage.classList.add("hide");
      }, 2500);
    }
  }
}

// check credetials with database
async function checkSignIn(username, password) {
  const response = await fetch(`http://localhost:8000/users/${username}`);
  const user = await response.json();
  const errorMessage = document.querySelector(".sign-in-error-message");

  // no match found in database
  if (user.length === 0) {
    errorMessage.innerHTML = `That username does not exist`;
    errorMessage.classList.remove("hide");
    setTimeout(() => {
      errorMessage.classList.add("hide");
    }, 2500);
    invalidUsernames.push(username);
  }

  // check if password matches
  else if (password === user[0].password) {
    // successful sign in
    localStorage.setItem("signed in as", JSON.stringify(username));

    // load sets from database on sign in
    localStorage.setItem("sets loaded from db", JSON.stringify("false"));
    window.location.href = "./Menu";
  } else {
    // incorrect password
    errorMessage.innerHTML = `Incorrect password`;
    errorMessage.classList.remove("hide");
    setTimeout(() => {
      errorMessage.classList.add("hide");
    }, 2500);
  }
}
