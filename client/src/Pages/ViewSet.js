import React, { useState } from "react";
import CardElement from "../Components/CardElement";
import "../CSS/ViewSet.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

let setId;
let set;

class Card {
  constructor(front, back) {
    this.card_id = 0; // temp, set to its actual value when adding to db/local storage
    this.front = front;
    this.back = back;

    this.MCQ_attempted = 0;
    this.MCQ_correct = 0;
    this.MCQ_percentage = 0;

    this.FITB_attempted = 0;
    this.FITB_correct = 0;
    this.FITB_percentage = 0;

    this.total_attempted = 0;
    this.total_correct = 0;
    this.total_percentage = 0;
  }
}

localStorage.setItem("cards loaded", JSON.stringify("false"));

const ViewSet = () => {
  getSet();
  let [currentCards, addNewCard] = useState([]);

  let loadedCardsFromDB = localStorage.getItem("cards loaded from db")
    ? JSON.parse(localStorage.getItem("cards loaded from db"))
    : [];

  let cardsLoaded;
  if (loadedCardsFromDB.indexOf(setId) !== -1) cardsLoaded = true;
  else cardsLoaded = false;

  if (!cardsLoaded) {
    localStorage.setItem("cards loaded", JSON.stringify("true"));
    loadCardsFromDB();
  }

  let loadedCards =
    JSON.parse(localStorage.getItem("cards loaded")) === "true" ? true : false;

  if (!loadedCards) loadCardsFromLocalStorage();

  async function loadCardsFromDB() {
    if (set == null) return;
    let cards = set.cards;
    if (cards == null) cards = [];
    let cardsLoaded = JSON.parse(localStorage.getItem("cards loaded from db"));
    if (cardsLoaded == null) cardsLoaded = [setId];
    else cardsLoaded.push(setId);

    let newCards = [];
    cards.forEach((card) => {
      getCardById(card);
    });

    async function getCardById(cardId) {
      await axios.get(`http://localhost:8000/cards/${cardId}`).then((res) => {
        newCards.push(res.data[0]);
      });

      if (newCards.length === cards.length) {
        set.cards = newCards;
        localStorage.setItem(`set: ${setId}`, JSON.stringify(set));
        loadCardsFromLocalStorage();
      }
    }

    localStorage.setItem("cards loaded from db", JSON.stringify(cardsLoaded));
  }

  function loadCardsFromLocalStorage() {
    localStorage.setItem("cards loaded", JSON.stringify("true"));

    if (set == null) return;

    let cards = set.cards;
    if (cards == null) return;

    cards = cards.sort((a, b) => sortCardsById(a, b));
    cards.forEach((card) => {
      addNewCard(
        (currentCards = currentCards.concat(
          <CardElement
            key={currentCards.length}
            card_id={card.card_id}
            card_front={card.front}
            card_back={card.back}
          />
        ))
      );
    });
  }

  function sortCardsById(a, b) {
    const a_id = parseInt(a.card_id);
    const b_id = parseInt(b.card_id);

    if (a_id > b_id) return 1;
    if (b_id > a_id) return -1;
    return 0;
  }

  function addCard() {
    const addCardMenu = document.querySelector(".add-card-menu");
    const cardFront = document.querySelector(".card-front-input");
    const cardBack = document.querySelector(".card-back-input");
    const cardSide = document.querySelector(".card-side-descriptor");

    let card = new Card(cardFront.value, cardBack.value);
    addCardMenu.classList.toggle("hide");

    let user = JSON.parse(localStorage.getItem("signed in as"));

    // reset the field values and default to the front of the card
    if (cardSide.innerHTML === "Card Back") {
      cardSide.innerHTML = "Card Front";
      cardFront.classList.toggle("hide");
      cardBack.classList.toggle("hide");
    }
    cardFront.value = "";
    cardBack.value = "";

    if (user) addCardToDatabase(card);
    else addCardToLocalStorage(card);
  }

  async function addCardToDatabase(card) {
    await axios
      .post(`http://localhost:8000/cards`, {
        front: `${card.front}`,
        back: `${card.back}`,
      })
      .then((res) => {
        let id = parseInt(res.data.substring(20));
        card.card_id = id;
      });
    getCardsFromSet(card);
    addCardToLocalStorage(card);
  }

  async function getCardsFromSet(card) {
    await axios.get(`http://localhost:8000/sets/cards/${setId}`).then((res) => {
      let cards = res.data[0].cards;
      // only store the card id's in the database
      if (cards == null) cards = [];
      cards.push(JSON.stringify(card.card_id));
      addCardsToSet(cards);
    });
  }

  async function addCardsToSet(cards) {
    await axios
      .put(`http://localhost:8000/sets/insertcards/${setId}`, {
        cards: { cards },
      })
      .then((res) => {
        // console.log(res.data);
      });
  }

  function addCardToLocalStorage(card) {
    let setId = JSON.parse(localStorage.getItem("viewing set"));
    if (setId == null) return;
    let currentSet = JSON.parse(localStorage.getItem(`set: ${setId}`));
    if (currentSet == null) return;

    let numCards = localStorage.getItem("num cards")
      ? JSON.parse(localStorage.getItem("num cards"))
      : 0;
    numCards++;

    // if card wasn't added to db (user not logged in)
    if (card.card_id === 0) {
      card.card_id = numCards + 1000000000;
    }
    addNewCard(
      currentCards.concat(
        <CardElement
          key={currentCards.length}
          card_id={card.card_id}
          card_front={card.front}
          card_back={card.back}
        />
      )
    );

    let cards = currentSet.cards;
    if (cards == null) cards = [];
    cards.push(card);
    currentSet.cards = cards;
    localStorage.setItem(`set: ${setId}`, JSON.stringify(currentSet));
    localStorage.setItem("num cards", JSON.stringify(numCards));
  }

  return (
    <>
      <h1 className="view-set-header">
        {set ? `Viewing set ${set.set_name}` : "error"}
      </h1>

      <div className="set-btns-container">
        <button onClick={toggleAddCardMenu}>Add Card</button>
        <button onClick={toggleEditSetMenu}>Edit Set Name</button>
        <button onClick={toggleDeleteSetMenu}>Delete Set</button>
        <button onClick={reviewSet}>Review Set</button>
        <button onClick={toggleEditBtns}>Edit Cards</button>
        <button onClick={toggleDeleteBtns}>Delete Cards</button>
      </div>

      <div className="add-card-menu hide">
        <FontAwesomeIcon
          icon={faX}
          className="close-add-card-menu"
          onClick={closeAddCardmenu}
        />
        <h2 className="add-card-header">Add Card</h2>
        <h4 className="card-side-descriptor">Card Front</h4>
        <textarea
          className="card-front-input"
          placeholder="Add a card"
        ></textarea>
        <textarea
          className="card-back-input hide"
          placeholder="Add a description"
        ></textarea>

        <div className="add-card-btn-container">
          <button onClick={flipCard}>Flip card</button>
          <button onClick={addCard}>Done</button>
        </div>
      </div>

      <div className="edit-card-menu hide">
        <FontAwesomeIcon icon={faX} className="close-edit-card-menu" />
        <h2 className="edit-card-header">Edit Card</h2>
        <h4 className="edit-side-descriptor">Card Front</h4>
        <textarea
          className="edit-card-front-input"
          placeholder="Edit card value"
        ></textarea>
        <textarea
          className="edit-card-back-input hide"
          placeholder="Edit description"
        ></textarea>

        <div className="edit-card-btn-container">
          <button onClick={flipEditCard}>Flip card</button>
          <button className="edit-card-done-btn">Done</button>
        </div>
      </div>

      <div className="delete-card-menu hide">
        <FontAwesomeIcon icon={faX} className="close-delete-card-menu" />

        <h2 className="delete-card-header">Delete Card</h2>
        <h4 className="delete-card-descriptor">Delete Card ""?</h4>
        <div className="delete-card-menu-btns-container">
          <button className="delete-card-no">No</button>
          <button className="delete-card-yes">Yes</button>
        </div>
      </div>

      <div className="edit-set-menu hide">
        <FontAwesomeIcon
          icon={faX}
          className="close-edit-set-menu"
          onClick={toggleEditSetMenu}
        />
        <h2 className="edit-set-header">Edit Set Name</h2>
        <input
          className="edit-set-input"
          name="edit-set-input"
          placeholder="New set name"
        ></input>
        <button className="edit-set-btn" onClick={editSet}>
          Done
        </button>
      </div>

      <div className="delete-set-menu hide">
        <FontAwesomeIcon
          icon={faX}
          className="close-delete-set-menu"
          onClick={toggleDeleteSetMenu}
        />
        <h2 className="delete-set-header">Delete Set</h2>
        <h4 className="delete-set-descriptor">Delete Set ""?</h4>

        <div className="delete-set-menu-btns-container">
          <button className="delete-set-no" onClick={toggleDeleteSetMenu}>
            No
          </button>
          <button className="delete-set-yes" onClick={deleteSetLocalStorage}>
            Yes
          </button>
        </div>
      </div>
      <div className="cards-container">{currentCards}</div>
    </>
  );
};

export default ViewSet;

function getSet() {
  setId = JSON.parse(localStorage.getItem("viewing set"));
  set = JSON.parse(localStorage.getItem(`set: ${setId}`));
  // console.log(set);
}

function flipCard() {
  const cardFront = document.querySelector(".card-front-input");
  const cardBack = document.querySelector(".card-back-input");
  const cardSide = document.querySelector(".card-side-descriptor");

  cardFront.classList.toggle("hide");
  cardBack.classList.toggle("hide");

  if (cardSide.innerHTML === "Card Front") cardSide.innerHTML = "Card Back";
  else cardSide.innerHTML = "Card Front";
}

function flipEditCard() {
  const cardFront = document.querySelector(".edit-card-front-input");
  const cardBack = document.querySelector(".edit-card-back-input");
  const cardSide = document.querySelector(".edit-side-descriptor");

  cardFront.classList.toggle("hide");
  cardBack.classList.toggle("hide");

  if (cardSide.innerHTML === "Card Front") cardSide.innerHTML = "Card Back";
  else cardSide.innerHTML = "Card Front";
}

function toggleAddCardMenu() {
  const addCardMenu = document.querySelector(".add-card-menu");
  const editCardMenu = document.querySelector(".edit-card-menu");
  if (!editCardMenu.classList.contains("hide"))
    editCardMenu.classList.add("hide");
  addCardMenu.classList.toggle("hide");
}

function reviewSet() {
  localStorage.setItem("reviewing set", JSON.stringify(setId));
  window.location.href = "/review";
}

function toggleEditBtns() {
  const btns = document.querySelectorAll(".edit-card-icon");
  btns.forEach((btn) => {
    btn.classList.toggle("hide");
  });
}

function toggleDeleteBtns() {
  const btns = document.querySelectorAll(".delete-card-icon");
  btns.forEach((btn) => {
    btn.classList.toggle("hide");
  });
}

function closeAddCardmenu() {
  const addCardMenu = document.querySelector(".add-card-menu");
  const cardSide = document.querySelector(".card-side-descriptor");
  if (cardSide.innerHTML === "Card Back") {
    cardSide.innerHTML = "Card Front";
    const cardFront = document.querySelector(".card-front-input");
    const cardBack = document.querySelector(".card-back-input");
    cardFront.classList.toggle("hide");
    cardBack.classList.toggle("hide");
  }
  addCardMenu.classList.add("hide");
}

function toggleEditSetMenu() {
  const editSetMenu = document.querySelector(".edit-set-menu");
  const editSetInput = document.querySelector(".edit-set-input");
  let setName = document.querySelector(".view-set-header").innerHTML;
  setName = setName.substring(12);
  editSetInput.value = setName;
  editSetMenu.classList.toggle("hide");
}

function toggleDeleteSetMenu() {
  const deleteSetMenu = document.querySelector(".delete-set-menu");
  deleteSetMenu.classList.toggle("hide");
  const deleteSetDescriptor = document.querySelector(".delete-set-descriptor");
  deleteSetDescriptor.innerHTML = `Delete Set "${set.set_name}?" All of this set's associated cards will also be deleted.`;
}

function editSet() {
  const editSetMenu = document.querySelector(".edit-set-menu");
  const newSetName = document.querySelector(".edit-set-input").value;
  const setName = document.querySelector(".view-set-header");
  setName.innerHTML = `Viewing set ${newSetName}`;
  editSetMenu.classList.toggle("hide");
  editSetLocalStorage(newSetName);
}

function editSetLocalStorage(newName) {
  let set = JSON.parse(localStorage.getItem(`set: ${setId}`));
  if (!set) return;
  set.set_name = newName;
  localStorage.setItem(`set: ${setId}`, JSON.stringify(set));

  let user = localStorage.getItem("signed in as")
    ? JSON.parse(localStorage.getItem("signed in as"))
    : null;

  if (user) editSetDB(newName);
}

function deleteSetLocalStorage() {
  localStorage.removeItem(`set: ${setId}`);
  window.location.href = "./Sets";
  let user = localStorage.getItem("signed in as")
    ? JSON.parse(localStorage.getItem("signed in as"))
    : null;
  if (user) deleteCardsFromSet();
}

async function deleteSetDB() {
  await axios.delete(`http://localhost:8000/sets/delete/${setId}`);
  // .then((res) => console.log(res));
}

async function deleteCardsFromSet() {
  await axios.get(`http://localhost:8000/sets/cards/${setId}`).then((res) => {
    let cards = res.data[0].cards;
    cards.forEach(card=> {
      deleteCard(card);
    })
  });
  deleteSetDB();
}
async function deleteCard(cardId) {
  await axios
    .delete(`http://localhost:8000/cards/delete/${cardId}`)
    .then((res) => {
      // console.log(res);
    });
}

async function editSetDB(newName) {
  await axios
    .put(`http://localhost:8000/sets/edit/${setId}`, {
      set_name: `${newName}`,
    })
    .then((res) => {
      // console.log(res.data);
    });
}
