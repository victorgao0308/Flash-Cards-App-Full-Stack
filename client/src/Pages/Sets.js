import React, { useState } from "react";
import "../CSS/Sets.css";
import SetElement from "../Components/SetElement";
import axios from "axios";

class Set {
  constructor(name, owner) {
    this.set_id = 0; // temp, replace with actual id after adding to database/localstorage
    this.set_name = name;
    this.cards = [];
    this.total_time_studied = null;
    this.total_accuracy = null;
    this.owner = owner;
  }
}

function sorter(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

localStorage.setItem("sets loaded", JSON.stringify("false"));

const Sets = () => {
  // get the user that is signed in
  let user = getOwner();

  let [currentSets, addNewSet] = useState([]);
  localStorage.setItem("cards loaded", JSON.stringify("false"));

  let loadedDB =
    JSON.parse(localStorage.getItem("sets loaded from db")) === "true"
      ? true
      : false;

  if (!loadedDB) {
    localStorage.setItem("sets loaded", JSON.stringify("true"));
    loadSetsFromDatabase(user);
  }

  let loaded =
    JSON.parse(localStorage.getItem("sets loaded")) === "true" ? true : false;

  if (!loaded) loadSetsFromLocalStorage();

  // load sets from local storage
  function loadSetsFromLocalStorage() {
    let keys = Object.keys(localStorage);

    // sort the keys so the sets stay in order
    keys = keys.filter((key) => {
      return key.includes("set:");
    });

    keys = keys.map((key) => {
      return parseInt(key.substring(5));
    });

    keys.sort(sorter);

    keys.forEach((key) => {
      let set_id = `set: ${key}`;
      let set = JSON.parse(localStorage.getItem(set_id));
      if (set.owner === user) {
        addNewSet(
          currentSets = currentSets.concat(
            [<SetElement
              key={currentSets.length}
              setName={set.set_name}
              set_id={set.set_id}
            />]
          )
        );
      }
    });

    localStorage.setItem("sets loaded", JSON.stringify("true"));
    localStorage.setItem("num sets", JSON.stringify(keys.length));
  }

  function addSet() {
    const setName = document.querySelector(".set-name-input");
    const addSetMenu = document.querySelector(".add-set-menu");
    let set = new Set(setName.value, user);

    // add set to database if user is signed in, and add set to local storage
    if (user) addSetToDatabase(set);
    else addSetToLocalStorage(set);

    // add a set to local storage
    function addSetToLocalStorage(set) {
      let numSets = localStorage.getItem("num sets")
        ? JSON.parse(localStorage.getItem("num sets"))
        : 0;
      numSets++;

      // didn't get added to db
      if (set.set_id === 0) {
        set.set_id = numSets + 1000000000;
      }
      localStorage.setItem("num sets", JSON.stringify(numSets));
      localStorage.setItem(`set: ${set.set_id}`, JSON.stringify(set));

      addSetMenu.classList.toggle("hide");
      addNewSet(
        currentSets.concat(
          <SetElement
            key={currentSets.length}
            setName={setName.value}
            set_id={set.set_id}
          />
        )
      );

      setName.value = "";
    }

    // add a set to the database
    async function addSetToDatabase(set) {
      await axios
        .post(`http://localhost:8000/sets`, {
          setName: `${set.set_name}`,
          owner: `${set.owner}`,
        })
        .then((res) => {
          let id = parseInt(res.data.substring(19));
          set.set_id = id;
        });
      addSetToLocalStorage(set);
    }
  }

  // load sets from database
  async function loadSetsFromDatabase(owner) {
    await axios
      .get(`http://localhost:8000/sets/${owner}`)
      .then((res) => {
        res.data.forEach((set) => {
          localStorage.setItem(`set: ${set.set_id}`, JSON.stringify(set));
        });
        localStorage.setItem("sets loaded from db", JSON.stringify("true"));
      })
      .catch((error) => {
        console.log(error);
        localStorage.setItem("sets loaded from db", JSON.stringify("false"));
      });
    loadSetsFromLocalStorage();
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

      <div className="sets-container">{currentSets}</div>
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
