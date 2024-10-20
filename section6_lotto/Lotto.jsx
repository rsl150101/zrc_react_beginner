import React, { useState, useRef, useEffect } from "react";

const getWinNumbers = () => {
  const candidate = Array(45)
    .fill()
    .map((_, i) => i + 1);
  const chosen = [];
  while (candidate.length > 38) {
    chosen.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const winNumbers = chosen.slice(0, 6).sort((p, c) => p - c);
  const bonusNumber = chosen[chosen.length - 1];
  return [...winNumbers, bonusNumber];
};

const Lotto = () => {
  const [winNumbers, setWinNumbers] = useState(getWinNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeoutsRef.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeoutsRef.current[winNumbers.length - 1] = setTimeout(() => {
      setBonus(winNumbers[winNumbers.length - 1]);
      setRedo(true);
    }, winNumbers.length * 1000);
    return () => {
      timeoutsRef.current.forEach((t) => {
        clearTimeout(t);
      });
    };
  }, [timeoutsRef.current]);

  const handleRedoBtn = () => {
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeoutsRef.current = [];
  };

  return (
    <>
      <h1>Lotto Number</h1>
      <div>
        {winBalls.map((v) => (
          <big key={`win_number_${v}`}> {v} </big>
        ))}
      </div>
      <h1>Bonus Number</h1>
      <big>{bonus}</big>
      <div>{redo && <button onClick={handleRedoBtn}>Redo</button>}</div>
    </>
  );
};

export default Lotto;
