import React from 'react';
import "../CSS/SetElement.css";

const SetElement = (prop) => {
    function click() {
        localStorage.setItem("viewing set", JSON.stringify(prop.setId));
        window.location.href = `./ViewSet`
    }
    return(
        <div className='set' onClick={click}>
            <h4 className='set-name'>{prop.setName}</h4>
        </div>
    )
}

export default SetElement;