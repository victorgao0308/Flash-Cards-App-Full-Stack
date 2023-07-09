import React, { useState} from "react";
import "../CSS/Sets.css";
import SetElement from "../Components/SetElement";


class Set {
  constructor(name, owner) {
    this.name = name;
    this.cards = [];
    this.owner = owner;
    this.setId = 0; // temp, replace with actual id after adding to database
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
