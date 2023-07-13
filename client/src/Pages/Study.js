import React from "react";

const Study = () => {
  localStorage.setItem("sets loaded", JSON.stringify("false"));
  localStorage.setItem("cards loaded", JSON.stringify("false"));


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "Left",
        alignItems: "Right",
        height: "80vh",
      }}
    >
      <h1>Study a Set</h1>
    </div>
  );
};

export default Study;
