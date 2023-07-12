import React from "react";
import "../CSS/Menu.css";

let welcomeText = "welcome";
let signOutBtn;

const Menu = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  isLoggedIn();
  return (
  <>
  <h1 className="menu-header">{welcomeText}</h1>
  {signOutBtn}
  </>
  );
};
export default Menu;

function isLoggedIn() {
  let user = JSON.parse(localStorage.getItem("signed in as"));
  if (user) {
    welcomeText = `Welcome back, ${user}`;
    signOutBtn = React.createElement('button', {className: 'sign-out-btn', onClick: signOut}, 'Sign Out');
  } else {
    welcomeText = `Welcome! Sign in or create an account to begin`;
  }
}

function signOut() {
  localStorage.removeItem("signed in as");
  window.location.href = "./menu"
}
