import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NumberBaseBall from "../section3_numberbaseball/NumberBaseball";
import RSP from "../section5_rsp/RSP";
import Lotto from "../section6_lotto/Lotto";

const Games = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NumberBaseBall />} />
        <Route path="/rock-scissors-paper" element={<RSP />} />
        <Route path="/lotto-generator" element={<Lotto />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Games;
