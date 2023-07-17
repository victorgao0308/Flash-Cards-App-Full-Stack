import React from "react";
import "../CSS/CardElement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const CardElement = (prop) => {
  function flipCard() {
    const cardFront = document.getElementById(`card-front-${prop.card_id}`);
    const cardBack = document.getElementById(`card-back-${prop.card_id}`);
    cardFront.classList.toggle("hide");
    cardBack.classList.toggle("hide");
  }

  function editCard() {
    flipCard(); // prevent card being flipped if user clicks on edit button
    const front = document.getElementById(`card-front-text: ${prop.card_id}`);
    const back = document.getElementById(`card-back-text: ${prop.card_id}`);
    const cardSide = document.querySelector(".edit-side-descriptor");

    const editMenu = document.querySelector(".edit-card-menu");
    const addCardMenu = document.querySelector(".add-card-menu");
    if (!addCardMenu.classList.contains("hide"))
      addCardMenu.classList.add("hide");
    editMenu.classList.toggle("hide");

    const frontInput = document.querySelector(".edit-card-front-input");
    const backInput = document.querySelector(".edit-card-back-input");
    frontInput.value = `${front.textContent}`;
    backInput.value = `${back.textContent}`;

    const doneBtn = document.querySelector(".edit-card-done-btn");
    doneBtn.addEventListener("click", helper);

    function helper() {
      if (cardSide.innerHTML === "Card Back") {
        cardSide.innerHTML = "Card Front";
        frontInput.classList.toggle("hide");
        backInput.classList.toggle("hide");
      }
      editMenu.classList.toggle("hide");
      front.innerHTML = frontInput.value;
      back.innerHTML = backInput.value;
      editCardLocalStorage(prop.card_id, frontInput.value, backInput.value);
      doneBtn.removeEventListener("click", helper);
    }
    const closeBtn = document.querySelector(".close-edit-card-menu");
    closeBtn.addEventListener("click", helper2);
    function helper2() {
      if (cardSide.innerHTML === "Card Back") {
        cardSide.innerHTML = "Card Front";
        frontInput.classList.toggle("hide");
        backInput.classList.toggle("hide");
      }
      editMenu.classList.add("hide");
      doneBtn.removeEventListener("click", helper);
      closeBtn.removeEventListener('click', helper2);
    }
  }

  function editCardLocalStorage(id, front, back) {
    let setId = JSON.parse(localStorage.getItem("viewing set"));
    if (!setId) return;
    let set = JSON.parse(localStorage.getItem(`set: ${setId}`));
    if (!set) return;
    let cards = set.cards;
    cards.forEach((card, index) => {
      if (card.card_id !== id) return;
      let editCard = cards[index];
      editCard.front = front;
      editCard.back = back;
    });
    localStorage.setItem(`set: ${setId}`, JSON.stringify(set));

    let user = localStorage.getItem("signed in as") ? JSON.parse(localStorage.getItem("signed in as")) : null;

    if (user) editCardDB(id, front, back);
  }

  async function editCardDB(id, front, back) {
    console.log(front, back)
    await axios
    .put(`http://localhost:8000/cards/edit/${id}`, {
      front: `${front}`,
      back: `${back}`
    })
    .then((res) => {
      console.log(res.data);
    });
  }

  return (
    <>
      <div
        className="card-front"
        id={"card-front-" + prop.card_id}
        onClick={flipCard}
      >
        <button className="edit-card-icon hide" onClick={editCard}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <h4 className="card-front-text" id={`card-front-text: ${prop.card_id}`}>
          {prop.card_front}
        </h4>
      </div>
      <div
        className="card-back hide"
        id={"card-back-" + prop.card_id}
        onClick={flipCard}
      >
        <button className="edit-card-icon hide" onClick={editCard}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <h4 className="card-back-text" id={`card-back-text: ${prop.card_id}`}>
          {prop.card_back}
        </h4>
      </div>
    </>
  );
};

export default CardElement;
