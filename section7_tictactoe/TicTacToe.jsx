import React, { useReducer } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: 0,
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
};

const reducer = (state, action) => {};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return;
};

export default TicTacToe;
