import React from "react";
import "../CSS/FITBCard.css";

const FITBCard = (prop) => {

  let attempts = 0;

  function checkFITB() {
    attempts++;
    const result = document.getElementById(`fitb-result-${prop.id}`);
    const input = document.getElementById(`fitb-input-${prop.id}`);
    const prevBtn = document.querySelector(".prev-study-card");
    
    if (input.value.toLowerCase() === prop.back.toLowerCase()) {
      result.innerHTML = "Correct!";
      input.disabled = true;
      const nextBtn = document.querySelector(".next-study-card");
      nextBtn.classList.remove("hide");
      prevBtn.classList.add("hide");
    } else {
      result.innerHTML = "Try Again! Go back and review if needed.";
      prevBtn.classList.remove("hide");

      setTimeout(() => {
        result.innerHTML = "";
      }, 2500)
    }
  }
  return (
    <div
      className="fitb-card"
      style={{ left: `${prop.id * 100 + 10}%` }}
      id={`card: ${prop.id}`}
    >
      <h3>{prop.front}</h3>
      <textarea
        className="fitb-input"
        id={`fitb-input-${prop.id}`}
        placeholder="Enter answer here (answer is not case sensitive)"
      ></textarea>
      <button className="submit-fitb-btn" onClick={checkFITB}>
        Submit
      </button>
      <div className="result-text-fitb" id={`fitb-result-${prop.id}`}></div>
    </div>
  );
};

export default FITBCard;
