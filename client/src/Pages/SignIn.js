import React from "react";
import "../CSS/SignIn.css";

const SignIn = () => {
  return (
    <>
      <h1 className="sign-in-text">Sign In</h1>
      <div className="sign-in-container">
        <div className="input-container">
          <input
            type="text"
            className="username-input"
            placeholder="Username"
          ></input>
          <input
            type="password"
            className="password-input"
            placeholder="Password"
          ></input>
        </div>

        <button className="sign-in-btn" onClick={signIn}>
          Sign In
        </button>
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
  if (username.length === 0 || username.indexOf(" ") !== -1) {
    console.log("enter a valid username");
  } else {
    if (invalidUsernames.indexOf(username) === -1) checkSignIn(username, password);
    else console.log("please enter a valid username");
  }

}

// check credetials with database
async function checkSignIn(username, password) {
  const response = await fetch(`http://localhost:8000/users/${username}`);
  const user = await response.json();

  // no match found in database
  if (user.length === 0) {
    console.log("please enter a valid username");
    invalidUsernames.push(username);
  }

  // check if password matches
  else if (password === user[0].password) {
    // successful sign in
    localStorage.setItem("signed in as", JSON.stringify(username))
    window.location.href = "./Menu";
  }
  else {
    // incorrect password
    console.log("incorrect password")
  }
}
