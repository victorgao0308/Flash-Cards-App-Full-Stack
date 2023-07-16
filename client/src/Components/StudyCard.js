import React from "react";
import "../CSS/StudyCard.css"

const StudyCard = (prop) => {
  function flipCard() {
    const cardFront = document.getElementById(`front: ${prop.id}`);
    const cardBack = document.getElementById(`back: ${prop.id}`);

    cardFront.classList.toggle("flipped");
    cardBack.classList.toggle("flipped");
  }

  return (
    <div className="review-card" onClick={flipCard} style={{left: `${prop.id * 100 + 10}%`}} id = {`card: ${prop.id}`}>
      <div className="review-card-front" id = {`front: ${prop.id}`}>wow</div>
      <div className="review-card-back" id = {`back: ${prop.id}`}>wow back</div>
    </div>
  );
};

export default StudyCard;
