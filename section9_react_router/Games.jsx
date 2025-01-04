import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/game/number-baseball">Number BaseBall</Link>
            </li>
            <li>
              <Link to="/game/rock-scissors-paper">RSP</Link>
            </li>
            <li>
              <Link to="/game/lotto-generator">Lotto</Link>
            </li>
            <li>
              <Link to="/game/index">Game matcher</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/game/:name" element={<GameMatcher />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Games;
