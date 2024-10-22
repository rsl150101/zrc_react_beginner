import React, { useReducer } from "react";
import Form from "./Form";
import Table from "./Table";

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
};

const reducer = (state, action) => {};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timer, result } = state;
  return (
    <>
      <Form />
      <h3>{timer}</h3>
      <Table />
      <h4>{result}</h4>
    </>
  );
};

export default Minesweeper;
