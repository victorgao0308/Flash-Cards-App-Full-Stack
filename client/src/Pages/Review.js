import React from "react";
import "../CSS/Review.css";
import StudyCard from "../Components/StudyCard";


let setId;
let set;
let studyCards = [];
let cardWidth;
let reviewProgress;

const Review = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  localStorage.setItem("cards loaded", JSON.stringify("false"));

  getSetToReview();
  loadReviewCards();

  return (
    <>
      <h1 className="review-header">Review a Set</h1>
      <div className="review-container">
        <h2 className="review-progress">{reviewProgress}</h2>
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
  const reviewProgress = document.querySelector(".review-progress");
  reviewProgress.innerHTML = `${cardNum + 1}/${studyCards.length}`;
  studyCards.forEach(card => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${(cardNum * cardWidth) / 0.8}px)`;
  });
}

function loadReviewCards() {
  let cards = set.cards;
  cards = cards.sort((a,b) => (sortCardsById(a, b)));
  reviewProgress = `1/${cards.length}`;
  cards.forEach((card, index) => {
    studyCards.push(<StudyCard key = {index} id = {index} front = {card.front} back = {card.back}/>);
  })
}


function sortCardsById (a,b) {
  const a_id = parseInt(a.card_id);
  const b_id = parseInt(b.card_id);

  if (a_id > b_id) return 1;
  if (b_id > a_id) return -1;
  return 0;
}

// adjust review cards' scroll distance if window gets resized
window.addEventListener("resize", () => {
  studyCards.forEach(card => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${(cardNum * cardWidth) / 0.8}px)`;
  });
});