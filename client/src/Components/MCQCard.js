import React from "react";
import "../CSS/MCQCard.css";

let option1, option2, option3, option4;

const MCQCard = (prop) => {
  getOptions(prop.back);

  function checkMCQ() {
    let options = document.getElementsByName(`mcq-options-${prop.id}`);
    let flag = false;
    const result = document.getElementById(`mqc-result-${prop.id}`);
    options.forEach((option) => {
      if (option.checked) {
        flag = true;
        let choice = document.getElementById(`${option.id}-label`);
        if (choice.textContent === prop.back) {
          result.innerHTML = "Correct!";
          setTimeout(() => {
            result.innerHTML = "";
          }, 1500);
        } else {
          result.innerHTML = "Try Again!";
          option.disabled = true;
          option.checked = false;
          setTimeout(() => {
            result.innerHTML = "";
          }, 1500);
        }
      }
    });
    if (!flag) {
      result.innerHTML = "Please select an option!";
      setTimeout(() => {
        result.innerHTML = "";
      }, 1500);
    }
  }
  return (
    <div
      className="mcq-card"
      style={{ left: `${prop.id * 100 + 10}%` }}
      id={`card: ${prop.id}`}
    >
      <h3>{prop.front}</h3>

      <ul className="mcq-options-container">
        <div>
          <input
            type="radio"
            name={`mcq-options-${prop.id}`}
            id={`mcq-${prop.id}-choice1`}
          ></input>
          <p id={`mcq-${prop.id}-choice1-label`}>{option1}</p>
        </div>
        <br></br>

        <div>
          <input
            type="radio"
            name={`mcq-options-${prop.id}`}
            id={`mcq-${prop.id}-choice2`}
          ></input>
          <p id={`mcq-${prop.id}-choice2-label`}>{option2}</p>
        </div>
        <br></br>

        <div>
          <input
            type="radio"
            name={`mcq-options-${prop.id}`}
            id={`mcq-${prop.id}-choice3`}
          ></input>
          <p id={`mcq-${prop.id}-choice3-label`}>{option3}</p>
        </div>
        <br></br>

        <div>
          <input
            type="radio"
            name={`mcq-options-${prop.id}`}
            id={`mcq-${prop.id}-choice4`}
          ></input>
          <p id={`mcq-${prop.id}-choice4-label`}>{option4}</p>
        </div>
      </ul>

      <div className="result-text" id={`mqc-result-${prop.id}`}></div>
      <button className="submit-mcq-btn" onClick={checkMCQ}>
        Submit
      </button>
    </div>
  );
};

export default MCQCard;

function getOptions(back) {
  let setId = JSON.parse(localStorage.getItem("studying set"));
  if (!setId) return;
  let set = JSON.parse(localStorage.getItem(`set: ${setId}`));
  if (!set) return;
  let cards = set.cards;

  if (cards.length < 4) return; //TODO: warn the user about this
  let options = [back];
  cards.forEach((card) => {
    if (card.back !== back) options.push(card.back);
  });

  while (options.length !== 4) {
    let randomNum = Math.floor(Math.random() * (options.length - 1)) + 1;
    options.splice(randomNum, 1);
  }

  options = shuffle(options);
  option1 = `${options[0]}`;
  option2 = `${options[1]}`;
  option3 = `${options[2]}`;
  option4 = `${options[3]}`;
}

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
