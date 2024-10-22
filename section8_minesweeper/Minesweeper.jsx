import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
  OPENED: 0,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  MINE: -7,
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
};

export const START_GAME = "START_GAME";

const plantMine = (row, col, mine) => {};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        tableData: plantMine(action.row, action.col, action.mine),
      };
    }
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timer, result, tableData } = state;
  const value = useMemo(() => ({ tableData, dispatch }), [tableData]);

  return (
    <TableContext.Provider value={value}>
      <Form />
      <h3>{timer}</h3>
      <Table />
      <h4>{result}</h4>
    </TableContext.Provider>
  );
};

export default Minesweeper;
