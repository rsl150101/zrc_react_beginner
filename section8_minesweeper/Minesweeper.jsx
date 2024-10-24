import React, { useReducer, createContext, useMemo, useEffect } from "react";
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
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  data: { row: 0, col: 0, mine: 0 },
  timer: 0,
  result: "",
  halted: true,
  oponedCount: 0,
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
const INCREMENT_TIMER = "INCREMENT_TIMER";

const plantMine = (row, col, mine) => {
  const candidate = Array(row * col)
    .fill()
    .map((_, i) => i);
  const mineArr = [];
  while (candidate.length > row * col - mine) {
    const chosenMine = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    mineArr.push(chosenMine);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < mineArr.length; k++) {
    const ver = Math.floor(mineArr[k] / col);
    const hor = mineArr[k] % col;
    data[ver][hor] = CODE.MINE;
  }
  return data;
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
      return {
        ...state,
        data: { row: action.row, col: action.col, mine: action.mine },
        tableData: plantMine(action.row, action.col, action.mine),
        halted: false,
        openedCount: 0,
        timer: 0,
        result: "",
      };
    }
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      });
      const checked = [];
      let count = 0;

      const checkAround = (row, col) => {
        if (
          row < 0 ||
          row >= tableData.length ||
          col < 0 ||
          col >= tableData[0].length
        ) {
          return;
        }
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(tableData[row][col])
        ) {
          return;
        }
        if (checked.includes(row + "/" + col)) {
          return;
        } else {
          checked.push(row + "/" + col);
        }
        let around = [];
        if (tableData[row - 1]) {
          around = around.concat(
            [tableData[row - 1][col - 1]],
            [tableData[row - 1][col]],
            [tableData[row - 1][col + 1]]
          );
        }
        around = around.concat(
          [tableData[row][col - 1]],
          [tableData[row][col + 1]]
        );
        if (tableData[row + 1]) {
          around = around.concat(
            [tableData[row + 1][col - 1]],
            [tableData[row + 1][col]],
            [tableData[row + 1][col + 1]]
          );
        }

        const mineCount = around.filter((mine) =>
          [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(mine)
        ).length;

        if (mineCount === 0) {
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, col - 1]);
            near.push([row - 1, col]);
            near.push([row - 1, col + 1]);
          }
          near.push([row, col - 1]);
          near.push([row, col + 1]);
          if (row + 1 < tableData.length) {
            near.push([row + 1, col - 1]);
            near.push([row + 1, col]);
            near.push([row + 1, col + 1]);
          }
          near.forEach((coord) => {
            if (tableData[coord[0]][coord[1]] !== CODE.OPENED) {
              checkAround(coord[0], coord[1]);
            }
          });
        }
        if (tableData[row][col] === CODE.NORMAL) {
          count += 1;
        }
        tableData[row][col] = mineCount;
      };
      checkAround(action.row, action.col);
      let halted = false;
      let result = "";
      if (
        state.data.row * state.data.col - state.data.mine ===
        state.openedCount + count
      ) {
        halted = true;
        result = "Win";
      }
      return {
        ...state,
        tableData,
        openedCount: state.openedCount + count,
        halted,
        result,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
        result: "Lose",
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.MINE) {
        tableData[action.row][action.col] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.col] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
        tableData[action.row][action.col] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.col] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
        tableData[action.row][action.col] = CODE.MINE;
      } else {
        tableData[action.row][action.col] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }
  }
};

const Minesweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { timer, result, tableData, halted } = state;
  const value = useMemo(
    () => ({ tableData, dispatch, halted }),
    [tableData, halted]
  );
  useEffect(() => {
    let timer;
    if (!halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

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
