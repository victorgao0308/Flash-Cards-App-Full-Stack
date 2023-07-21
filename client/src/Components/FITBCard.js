import React from "react";
import "../CSS/FITBCard.css";

const FITBCard = (prop) => {
  function checkFITB() {
    const result = document.getElementById(`fitb-result-${prop.id}`);
    const input = document.getElementById(`fitb-input-${prop.id}`);
    if (input.value.toLowerCase() === prop.back.toLowerCase()) {
      result.innerHTML = "Correct!";
      input.disabled = true;
    } else {
      result.innerHTML = "Try Again!";
      setTimeout(() => {
        result.innerHTML = "";
      }, 1500)
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
        placeholder="Enter answer here"
      ></textarea>
      <button className="submit-fitb-btn" onClick={checkFITB}>
        Submit
      </button>
      <div className="result-text-fitb" id={`fitb-result-${prop.id}`}></div>
    </div>
  );
};

export default FITBCard;
