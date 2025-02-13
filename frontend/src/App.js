import React, { useEffect, useState } from "react";

import Card from './components/Card.js'

import { data } from "./data.js";
import Cardview from "./components/Card.js";

function App() {
  //const [backendData, setBackendData] = useState("");

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])

  return (
    <div>
      <Cardview/>
    </div>
  );
}

export default App;
