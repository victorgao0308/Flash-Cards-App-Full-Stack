import React from "react";
import axios from "axios";
import "../CSS/SignUp.css";

const SignUp = () => {
  return (
    <>
      <h1 className="sign-up-text">Sign Up</h1>
      <div className="sign-up-container">
        <div className="sign-up-input-container">
          <div className="input-container">
            <h4>Email</h4>
            <input
              type="text"
              className="sign-up-email"
              placeholder="Email"
            ></input>
          </div>

          <div className="input-container">
            <h4>Username</h4>
            <input
              type="text"
              className="sign-up-username"
              placeholder="Username"
            ></input>
          </div>

          <div className="input-container">
            <h4>Password</h4>
            <input
              type="password"
              className="sign-up-password"
              placeholder="Password"
            ></input>
          </div>
        </div>
        <button className="sign-up-btn" onClick={signUp}>
          Sign Up
        </button>
        <div className="sign-up-error-message-container">
          <p className="sign-up-error-message hide"></p>
        </div>
      </div>
    </>
  );
};
export default SignUp;

function signUp() {
  const email = document.querySelector(".sign-up-email").value;
  const username = document.querySelector(".sign-up-username").value;
  const password = document.querySelector(".sign-up-password").value;
  const errorMessage = document.querySelector(".sign-up-error-message");

  if (email.length === 0 || username.length === 0 || password.length === 0) {
    errorMessage.innerHTML = `Please fill out all the fields!`;
    errorMessage.classList.remove("hide");
    setTimeout(() => {
      errorMessage.classList.add("hide");
    }, 2500);
  } else signUpDatabase(username, password, email);
}

// attempt to create a new user in the database
async function signUpDatabase(username, password, email) {
  await axios
    .post(`http://localhost:8000/users`, {
      username: `${username}`,
      password: `${password}`,
      email: `${email}`,
    })
    .then((res) => {
      console.log(res.data);
      const errorMessage = document.querySelector(".sign-up-error-message");
      // username already exists
      if (
        res.data ===
        `error: duplicate key value violates unique constraint "accounts_username_key"`
      ) {
        errorMessage.innerHTML = `Username "${username}" already exists!`;
        errorMessage.classList.remove("hide");
        setTimeout(() => {
          errorMessage.classList.add("hide");
        }, 2500);
      }
      // email already exists
      else if (
        res.data ===
        `error: duplicate key value violates unique constraint "accounts_email_key"`
      ) {
        errorMessage.innerHTML = `Email "${email}" already exists!`;
        errorMessage.classList.remove("hide");
        setTimeout(() => {
          errorMessage.classList.add("hide");
        }, 2500);
      }
      // catch other errors
      else if (res.data.includes(`error`)) {
        errorMessage.innerHTML = `Unknown error occurred`;
        errorMessage.classList.remove("hide");
        setTimeout(() => {
          errorMessage.classList.add("hide");
        }, 2500);
      }
      // success
      else {
        errorMessage.innerHTML = `Success`;
        errorMessage.classList.remove("hide");
        setTimeout(() => {
          errorMessage.classList.add("hide");
        }, 2500);
      }
    })
    .catch((error) => console.log(error));
}
