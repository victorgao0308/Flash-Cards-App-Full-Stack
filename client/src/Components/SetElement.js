import React from 'react';
import "../CSS/SetElement.css";

const SetElement = (prop) => {

    function click() {
        console.log(`${prop.setName}`)
    }
    return(
        <div className='set' onClick={click}>
            <h4 className='set-name'>{prop.setName}</h4>
        </div>
    )
}

export default SetElement;