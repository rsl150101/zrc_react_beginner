import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import NumberBaseBall from "../section3_numberbaseball/NumberBaseball";
import RSP from "../section5_rsp/RSP";
import Lotto from "../section6_lotto/Lotto";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/number-baseball">Number BaseBall</Link>
            </li>
            <li>
              <Link to="/rock-scissors-paper">RSP</Link>
            </li>
            <li>
              <Link to="/lotto-generator">Lotto</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/number-baseball" element={<NumberBaseBall />} />
        <Route path="/rock-scissors-paper" element={<RSP />} />
        <Route path="/lotto-generator" element={<Lotto />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Games;
