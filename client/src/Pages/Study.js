import React from "react";
import "../CSS/Study.css";
import StudyCard from "../Components/StudyCard";
import MCQCard from "../Components/MCQCard";

let studyingSet;
let studyProgress;
let noSetToLoad;
let studyCards = [];
let set;
let cardWidth;

const Study = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  localStorage.setItem("cards loaded", JSON.stringify("false"));

  getStudySet();
  loadStudyCards();
  return (
    <>
      <h1 className="study-header">Study a Set</h1>
      <h3 className="study-descriptor">{studyingSet}</h3>
      <div className="study-container">
        {noSetToLoad}
        <h2 className="study-progress">{studyProgress}</h2>
        <div className="study-card-container">{studyCards}</div>
        <div className="study-btns-container">
          <button onClick={nextCard}>Next</button>
        </div>
      </div>
    </>
  );
};
export default Study;

function getStudySet() {
  let setId = JSON.parse(localStorage.getItem("studying set"));
  if (!setId) return;
  set = JSON.parse(localStorage.getItem(`set: ${setId}`));
  if (!set) return;
  studyingSet = `Studying set "${set.set_name}"`;
}

function loadStudyCards() {
  if (!set) {
    noSetToLoad = `No set to load. To start a study session, go to the sets tab, click on the set you wish to study, and click on "Study Set".`;
    return;
  }
  let cards = set.cards;
  if (!cards || cards.length === 0) {
    noSetToLoad = `Error! Set "${set.set_name}" contains no cards.`;
    return;
  }
  cards = cards.sort((a, b) => sortCardsById(a, b));
  studyProgress = `1/${cards.length} | Learn`;




  cards.forEach((card, index) => {
    studyCards.push(
      <MCQCard key={index} id={index} front={card.front} back={card.back} />
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


let cardNum = 0;
function nextCard() {
  if (!set) return;
  if(!set.cards) return;
  cardNum++;
  if (cardNum >= studyCards.length) cardNum = 0;
  moveCards(cardNum);
}

function moveCards(cardNum) {
  const studyProgress = document.querySelector(".study-progress");
  studyProgress.innerHTML = `${cardNum + 1}/${studyCards.length} | Quiz`;
  studyCards.forEach((card) => {
    const cardElement = document.getElementById(`card: ${card.props.id}`);
    cardWidth = cardElement.getBoundingClientRect().width;

    cardElement.style.transform = `translateX(-${
      (cardNum * cardWidth) / 0.8
    }px)`;
  });
}
