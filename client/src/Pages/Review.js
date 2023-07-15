import React from "react";
import "../CSS/Review.css"


let setId;
let set;

const Review = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  localStorage.setItem("cards loaded", JSON.stringify("false"));

  getSetToReview();

  return (
    <>
      <h1 className="review-header">Review a Set</h1>
      <div className="review-container">
        <h2 className="review-progress">1/69420</h2>
        <div className="review-card-container">

          <div className="review-card" onClick={flipCard}>
            <div className="review-card-front">wow</div>
            <div className="review-card-back">wow back</div>
          </div>

          <div className="review-card" onClick={flipCard} style={{left: `150%`} }>
            <div className="review-card-front">wow</div>
            <div className="review-card-back">wow back</div>
          </div>


        </div>


        <div className="review-btns-container">
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </>
  );
};

export default Review;

function getSetToReview() {
  setId = JSON.parse(localStorage.getItem("reviewing set"));
  set = JSON.parse(localStorage.getItem(`set: ${setId}`));
}

function flipCard() {
  const cardFront = document.querySelector(".review-card-front");
  const cardBack = document.querySelector(".review-card-back");

  cardFront.classList.toggle("flipped");
  cardBack.classList.toggle("flipped");
}