import React, { useState } from "react";
import "./abcd.css";

const ABCD = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const toggleInput = () => {
    setIsInputVisible(true);
  };
  return (
    <div>
      <button id="myBtn">Open Modal</button>
      <div id="myModal" className={`modal modal-type`}></div>
      <div className="modal-content">
        <p>Some text in the Modal..</p>
        {isInputVisible ? (
          <input type="text" />
        ) : (
          <button onClick={toggleInput}>Convert to Input</button>
        )}
      </div>
    </div>
  );
};

export default ABCD;
