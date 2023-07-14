import React, { useState } from "react";
import CardElement from "../Components/CardElement";
import "../CSS/ViewSet.css";
import axios from "axios";

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
  const [currentCards, addNewCard] = useState([]);

  getSet();

  let loadedCards =
    JSON.parse(localStorage.getItem("cards loaded")) === "true" ? true : false;

  if (!loadedCards) loadCardsFromLocalStorage();

  let loadedCardsFromDB =
    localStorage.getItem("cards loaded from db") ? JSON.parse(localStorage.getItem("cards loaded from db")) : [];

  let cardsLoaded;
  if (loadedCardsFromDB.indexOf(setId) !== -1) cardsLoaded = true;
  else cardsLoaded = false;

  if (!cardsLoaded) loadCardsFromDB();

  function loadCardsFromDB() {
    let cards = set.cards;
    let cardsLoaded = JSON.parse(localStorage.getItem("cards loaded from db"));
    if (cardsLoaded == null) cardsLoaded = [setId];
    else cardsLoaded.push(setId);

    localStorage.setItem("cards loaded from db", JSON.stringify(cardsLoaded));
  }

  function loadCardsFromLocalStorage() {
    localStorage.setItem("cards loaded", JSON.stringify("true"));

    if (set == null) return;

    let cards = set.cards;
    if (cards == null) return;
    cards.forEach((card) => {
      currentCards.push(
        <CardElement
          key={currentCards.length}
          card_id={card.card_id}
          card_front={card.front}
          card_back={card.back}
        />
      );
    });
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
        console.log(res.data);
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
        <button>Edit Set Name</button>
        <button>Delete Set</button>
      </div>

      <div className="add-card-menu hide">
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

function toggleAddCardMenu() {
  const addCardMenu = document.querySelector(".add-card-menu");
  addCardMenu.classList.toggle("hide");
}