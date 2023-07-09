import React from 'react';
import '../CSS/Menu.css';


let welcomeText = "welcome"
const Menu = () => {
isLoggedIn();
  return (
    <h1 className='menu-header'>{welcomeText}</h1>
  );
};
export default Menu;


function isLoggedIn() {
	let user = JSON.parse(localStorage.getItem("signed in as"));
	if (user) {
    welcomeText = `Welcome back, ${user}`;
	}
  else {
    welcomeText = `Welcome! Create sign in or create an account to begin`
  }
}