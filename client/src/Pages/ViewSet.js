import React from "react";
import "../CSS/ViewSet.css";

let setId;
let set;

class Card {
  constructor(front, back) {
    this.card_id = 0; // temp, set to its actual value when adding to db/local storage
    this.front = front;
    this.back = back;

    this.MCQ_attempted = 0;
    this.MCC_crrect = 0;
    this.MCQ_percentage = 0;

    this.FITB_attempted = 0;
    this.FITB_xorrect = 0;
    this.FITB_percentage = 0;

    this.total_attempted = 0;
    this.total_correct = 0;
    this.total_percentage = 0;
  }
}

const ViewSet = () => {
  getSet();
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

function addCard() {
  const addCardMenu = document.querySelector(".add-card-menu");
  const cardFront = document.querySelector(".card-front-input");
  const cardBack = document.querySelector(".card-back-input");
  let card = new Card(cardFront.value, cardBack.value);
  addCardMenu.classList.toggle("hide");

  let user = JSON.parse(localStorage.getItem("signed in as"));

  if (user) addCardToDatabase(card);
  else addCardToLocalStorage(card);

}

function addCardToDatabase(card) {

}
function addCardToLocalStorage(card) {

}
