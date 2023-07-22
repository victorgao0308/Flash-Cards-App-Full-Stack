import React from "react";
import "../CSS/Study.css";
import StudyCard from "../Components/StudyCard";
import MCQCard from "../Components/MCQCard";
import FITBCard from "../Components/FITBCard";

let studyingSet;
let studyProgress;
let noSetToLoad;
let studyCards = [];
let set;
let cardWidth;
let cardElements = [];

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
        <div className="study-card-container">{studyCards}
        
        <div className="study-end hide">
          <h4 className="study-accuracy">Total Accuracy: </h4>
          <h4 className="study-time">Session Time: </h4>
        </div>
        </div>
        <div className="study-btns-container">
          <button onClick={prevCard} className="prev-study-card hide">
            Prev
          </button>
          <button onClick={nextCard} className="next-study-card">
            Next
          </button>
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
  if (!cards || cards.length <= 3) {
    noSetToLoad = `Error! You need at least 4 cards in "${set.set_name}" to study the set.`;
    return;
  }

  cards.forEach((card) => {
    cardElements.push(new Study_Card(card));
  });

  cardElements = shuffle(cardElements);

  cards.forEach((card) => {
    let index = 0;
    cardElements.forEach((element, i) => {
      if (element instanceof Study_Card && element.card === card) {
        index = i;
      }
    });
    let min = index + 1;
    let max = cardElements.length - 1;
    let randInt = Math.floor(Math.random() * (max - min + 1)) + min;
    cardElements.splice(randInt, 0, new MCQ_Card(card));
  });

  cards.forEach((card) => {
    let index = 0;
    cardElements.forEach((element, i) => {
      if (element instanceof Study_Card && element.card === card) {
        index = i;
      }
    });
    let min = index + 1;
    let max = cardElements.length - 1;
    let randInt = Math.floor(Math.random() * (max - min + 1)) + min;
    cardElements.splice(randInt, 0, new MCQ_Card(card));
  });

  cardElements.forEach((card, index) => {
    if (card instanceof Study_Card) {
      studyCards.push(
        <StudyCard
          key={index}
          id={index}
          front={card.card.front}
          back={card.card.back}
        />
      );
    } else if (card instanceof MCQ_Card) {
      studyCards.push(
        <MCQCard
          key={index}
          id={index}
          front={card.card.front}
          back={card.card.back}
          card_id={card.card.card_id}
        />
      );
    } else {
      studyCards.push(
        <FITBCard
          key={index}
          id={index}
          front={card.card.front}
          back={card.card.back}
          card_id={card.card.card_id}
        />
      );
    }
  });

  studyProgress = `1/${cardElements.length} | Learn`;
}

let cardNum = 0;
function nextCard() {
  if (!set) return;
  if (!set.cards) return;
  cardNum++;
  moveCards(cardNum);
}

function prevCard() {
  if (!set) return;
  if (!set.cards) return;
  cardNum--;
  if (cardNum < 0) return;
  moveCards(cardNum);
}

function moveCards(cardNum) {
  let cardElement = document.getElementById(`card: 0`);
  cardWidth = cardElement.getBoundingClientRect().width;
  const studyProgress = document.querySelector(".study-progress");
  const nextBtn = document.querySelector(".next-study-card");

  let currentElement = document.getElementById(`card: ${cardNum}`);

  if (currentElement) {
    if (currentElement.classList.contains("review-card")) {
      studyProgress.innerHTML = `${cardNum + 1}/${studyCards.length} | Learn`;
      nextBtn.classList.remove("hide");
    } else {
      studyProgress.innerHTML = `${cardNum + 1}/${studyCards.length} | Quiz`;
      nextBtn.classList.add("hide");
    }
  } else {
    studyProgress.innerHTML = `Study Session Complete!`;
    nextBtn.classList.add("hide");
    const studyEnd = document.querySelector(".study-end");
    setTimeout(() => {
      studyEnd.classList.remove("hide");
    }, 1500);

    const studyAccuracy = document.querySelector(".study-accuraccy");
    let studyStats = localStorage.getItem("study stats") ? new Map(JSON.parse(localStorage.getItem("study stats"))) : new Map();

    
  }

  studyCards.forEach((card) => {
    cardElement = document.getElementById(`card: ${card.props.id}`);
    cardElement.style.transform = `translateX(-${
      (cardNum * cardWidth) / 0.8
    }px)`;
  });
}

window.addEventListener("resize", () => {
  moveCards(cardNum);
});

// shuffle an array
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

class Study_Card {
  constructor(card) {
    this.card = card;
  }
}

class MCQ_Card {
  constructor(card) {
    this.card = card;
  }
}

class FITB_Card {
  constructor(card) {
    this.card = card;
  }
}

// chooses a MCQ or FITB card based on % correct
// returns true for MCQ, false for FITB
function chooseQuizCard(card) {
  if (card.total_percentage <= 0.3 && card.total_attempted <= 10) return true;
  const range = Math.ceil(
    Math.min(card.total_attempted, 25) * card.total_percentage
  );
  const threshold =
    Math.floor(Math.random() * range) + card.FITB_percentage * 10;
  if (threshold >= range) return false;
  const rand = Math.floor(Math.random() * range);
  if (rand <= threshold) return false;
  return true;
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cardNum = cardElements.length;
    console.log(cardNum);
    moveCards(cardNum);
  }
});
