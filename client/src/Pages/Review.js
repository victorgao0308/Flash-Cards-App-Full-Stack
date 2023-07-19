import React from "react";
import "../CSS/Review.css";
import StudyCard from "../Components/StudyCard";

let setId;
let set;
let reviewCards = [];
let cardWidth;
let reviewProgress;
let noSetToLoad;
let reviewSetHeader;


const Review = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  localStorage.setItem("cards loaded", JSON.stringify("false"));

  reviewCards = [];
  getSetToReview();
  loadReviewCards();

  return (
    <>
      <h1 className="review-header">Review a Set</h1>
      <h3 className="review-descriptor">{reviewSetHeader}</h3>
      <div className="review-container">
        {noSetToLoad}
        <h2 className="review-progress">{reviewProgress}</h2>
        <div className="review-card-container">{reviewCards}</div>

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
  if (set) reviewSetHeader = `Reviewing set "${set.set_name}"`;
  else reviewSetHeader = `Error!`;
}

let cardNum = 0;
function nextCard() {
  if (!set) return;
  if(!set.cards) return;
  cardNum++;
  if (cardNum >= reviewCards.length) cardNum = 0;
  moveCards(cardNum);
}

function prevCard() {
  if (!set) return;
  if(!set.cards) return;
  cardNum--;
  if (cardNum < 0) cardNum = reviewCards.length - 1;
  moveCards(cardNum);
}

function moveCards(cardNum) {
  const reviewProgress = document.querySelector(".review-progress");
  reviewProgress.innerHTML = `${cardNum + 1}/${reviewCards.length}`;
  reviewCards.forEach((card) => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${
      (cardNum * cardWidth) / 0.8
    }px)`;
  });
}

function loadReviewCards() {
  if (!set) {
    noSetToLoad = `No set to load. To start a review session, go to the sets tab, click on the set you wish to review, and click on "Review Set".`;
    return;
  }
  let cards = set.cards;
  if(!cards || cards.length === 0) {
    noSetToLoad = `Error! Set "${set.set_name}" contains no cards.`;
    return;
  }
  cards = cards.sort((a, b) => sortCardsById(a, b));
  reviewProgress = `1/${cards.length}`;
  cards.forEach((card, index) => {
    reviewCards.push(
      <StudyCard key={index} id={index} front={card.front} back={card.back} />
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

// adjust review cards' scroll distance if window gets resized
window.addEventListener("resize", () => {
  reviewCards.forEach((card) => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${
      (cardNum * cardWidth) / 0.8
    }px)`;
  });
});
