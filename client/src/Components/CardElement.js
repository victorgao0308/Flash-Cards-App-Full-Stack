import React from "react";
import "../CSS/CardElement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const CardElement = (prop) => {
  function flipCard() {
    const cardFront = document.getElementById(`card-front-${prop.card_id}`);
    const cardBack = document.getElementById(`card-back-${prop.card_id}`);
    cardFront.classList.toggle("hide");
    cardBack.classList.toggle("hide");
  }

  function editCard() {
    flipCard();
    const front = document.getElementById(`card-front-text: ${prop.card_id}`);
    const back = document.getElementById(`card-back-text: ${prop.card_id}`);
    console.log(front.textContent, back.textContent);
    const editMenu = document.querySelector(".edit-card-menu");
    const addCardMenu = document.querySelector(".add-card-menu");
    if (!addCardMenu.classList.contains("hide")) addCardMenu.classList.add("hide");
    editMenu.classList.toggle("hide");
  }
  return (
    <>
      <div
        className="card-front"
        id={"card-front-" + prop.card_id}
        onClick={flipCard}
      >
        <button className="edit-card-icon hide" onClick={editCard}>
          <FontAwesomeIcon
            icon={faEdit}
          />
        </button>
        <h4 className="card-front-text" id = {`card-front-text: ${prop.card_id}`}>{prop.card_front}</h4>
      </div>
      <div
        className="card-back hide"
        id={"card-back-" + prop.card_id}
        onClick={flipCard}
      >
        <button className="edit-card-icon hide" onClick={editCard}>
          <FontAwesomeIcon
            icon={faEdit}
          />
        </button>
        <h4 className="card-back-text" id = {`card-back-text: ${prop.card_id}`}>{prop.card_back}</h4>
      </div>
    </>
  );
};

export default CardElement;
