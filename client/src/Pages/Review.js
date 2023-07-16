import React from "react";
import "../CSS/Review.css";
import StudyCard from "../Components/StudyCard";


let setId;
let set;
let studyCards = [];
let cardWidth;

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
          {studyCards}
        </div>

        <div className="review-btns-container">
          <button onClick={prevCard}>Prev</button>
          <button onClick={nextCard}>Next</button>
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


let cardNum = 0;
function nextCard() {
  cardNum++;
  if(cardNum >= studyCards.length) cardNum = 0;
  moveCards(cardNum);
}

function prevCard() {
  cardNum--;
  if (cardNum < 0) cardNum = studyCards.length - 1;
  moveCards(cardNum);
}

function moveCards(cardNum) {
  studyCards.forEach(card => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${(cardNum * cardWidth) / 0.8}px)`;
  });
}


studyCards.push(<StudyCard key = {0} id = {0}/>);
studyCards.push(<StudyCard key = {1} id = {1}/>);

// adjust review cards' scroll distance if window gets resized
window.addEventListener("resize", () => {
  studyCards.forEach(card => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${(cardNum * cardWidth) / 0.8}px)`;
  });
});