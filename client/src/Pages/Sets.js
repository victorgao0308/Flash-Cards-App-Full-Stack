import React, { useState} from "react";
import "../CSS/Sets.css";
import SetElement from "../Components/SetElement";




class Set {
  constructor(name, owner) {
    this.name = name;
    this.cards = [];
    this.owner = owner;
    this.setId = -1; // temp, replace with actual id after adding to database/localstorage
  }

}

const Sets = () => {
  const [currentSets, addNewSet] = useState([]);

  function addSet() {
	const setName = document.querySelector(".set-name-input");
	const addSetMenu = document.querySelector(".add-set-menu");
	let user = getOwner();
	let set = new Set(setName.value, user);
	addSetMenu.classList.toggle("hide");
	addNewSet(currentSets.concat(<SetElement key = {currentSets.length} setName = {setName.value}/>));
	setName.value = "";


	// add set to database if user is signed in, and add set to local storage
	if (user) addSetToDatabase(set);
	addSetToLocalStorage(set);
  }

  return (
    <>
      <h1 className="sets-header">My Sets</h1>
      <button className="add-set-btn" onClick={toggleAddSetMenu}>
        Add New Set
      </button>

      <div className="add-set-menu hide">
        <h3>Add a set</h3>

        <div className="set-name-container">
          <h4>Set Name</h4>
          <input
            type="text"
            placeholder="Set Name"
            className="set-name-input"
          ></input>
        </div>

        <button className="create-set-btn" onClick={addSet}>
          Add Set
        </button>
      </div>

      <div className="sets-container">
        {currentSets}
      </div>
    </>
  );
};
export default Sets;

function toggleAddSetMenu() {
  const addSetMenu = document.querySelector(".add-set-menu");
  addSetMenu.classList.toggle("hide");
}


function getOwner() {
  return JSON.parse(localStorage.getItem("signed in as"));
}


// add a set to the database
function addSetToDatabase(set) {

}

// add a set to local storage
function addSetToLocalStorage(set) {
	let numSets = localStorage.getItem('num sets') ? JSON.parse(localStorage.getItem('num sets')) : 0;
	numSets++;
	if (set.setId === - 1) {
		set.setId = numSets;
	}
	localStorage.setItem('num sets', JSON.stringify(numSets));
	localStorage.setItem(`set ${numSets}`, JSON.stringify(set));
	console.log(numSets);
}


// load sets from database
function loadSetsFromDatabase() {

}