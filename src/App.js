import "./App.css";

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [randomNum, setRandomNum] = useState(0);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3600/api/random");
      setRandomNum(response.data.randomNum);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (randomNum >= 0) {
      setCards(Array.from({ length: randomNum }, (_, index) => index + 1));

      const interval = setInterval(() => {
        setRandomNum((prevRandomNum) => prevRandomNum - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      const fetchNewRandomNum = async () => {
        const response = await axios.get("http://localhost:3600/api/random");
        setRandomNum(response.data.randomNum);
        setCards([]);
      };

      fetchNewRandomNum();
    }
  }, [randomNum]);

  return (
    <div className="App">
      <h1>Random Number {randomNum}</h1>
      <div className="card-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
