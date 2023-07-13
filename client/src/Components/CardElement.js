import React from "react";
import "../CSS/CardElement.css";

const CardElement = (prop) => {
function flipCard() {
    const cardFront = document.getElementById(`card-front-${prop.card_id}`);
    const cardBack = document.getElementById(`card-back-${prop.card_id}`);
    cardFront.classList.toggle('hide');
    cardBack.classList.toggle('hide');
}
  return (
    <>
      <div className="card-front" id = {"card-front-" + prop.card_id} onClick={flipCard}>
        <h4 className="card-front-text">{prop.card_front}</h4>
      </div>
      <div className="card-back hide" id = {"card-back-" + prop.card_id} onClick={flipCard}>
        <h4 className="card-back-text">{prop.card_back}</h4>
      </div>
    </>
  );
};

export default CardElement;
