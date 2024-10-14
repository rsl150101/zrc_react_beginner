const React = require("react");
const { useState, useRef, useEffect } = React;

const rspCoords = {
  scissors: "-140px",
  rock: "0",
  paper: "-287px",
};

const scores = {
  scissors: -1,
  rock: 0,
  paper: 1,
};

const getComputerRsp = (imgCoord) => {
  return Object.keys(rspCoords).find((key) => rspCoords[key] === imgCoord);
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const [shoot, setShoot] = useState(false);
  const intervalRef = useRef(null);

  changeHand = () => {
    if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(changeHand, 100);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [imgCoord]);

  handleRspClickBtn = (chosen) => () => {
    setShoot((prevShoot) => !prevShoot);
    clearInterval(intervalRef.current);
    const userChosen = scores[chosen];
    const computerChosen = scores[getComputerRsp(imgCoord)];
    const diff = userChosen - computerChosen;

    if (diff === 0) {
      setResult("Draw");
    } else if ([-1, 2].includes(diff)) {
      setResult("Lose");
      setScore((prevScore) => prevScore - 1);
    } else {
      setResult("Win");
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setShoot((prevShoot) => !prevShoot);
      intervalRef.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div
        className="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button onClick={handleRspClickBtn("scissors")} disabled={shoot}>
          Scissors
        </button>
        <button onClick={handleRspClickBtn("rock")} disabled={shoot}>
          Rock
        </button>
        <button onClick={handleRspClickBtn("paper")} disabled={shoot}>
          Paper
        </button>
      </div>
      <div>
        <h2>{result}</h2>
      </div>
      <div>
        <h4>score : {score}</h4>
      </div>
    </>
  );
};

module.exports = RSP;
