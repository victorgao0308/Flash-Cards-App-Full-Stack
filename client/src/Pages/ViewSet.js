import React from "react";
import "../CSS/ViewSet.css"


let setId;
let set;

const ViewSet = () => {
  getSet();
    return (
      <>
      <h1 className="view-set-header"> {set? `Viewing set ${set.set_name}` : "error"}</h1>
      <button>Add Card</button>
      </>
    );
  };
    
  export default ViewSet;
  
  function getSet() {
    setId = JSON.parse(localStorage.getItem("viewing set"));
    set = JSON.parse(localStorage.getItem(`set: ${setId}`));
    console.log(set)
  }