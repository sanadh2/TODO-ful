import React, { useEffect, useState } from "react";
import "./abcd.css";

const ABCD = () => {
  const [count, setcount] = useState(0);

  return (
    <div>
      <button id="myBtn">{count}</button>
    </div>
  );
};

export default ABCD;
