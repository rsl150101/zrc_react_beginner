import React, { useCallback, useContext } from "react";
import {
  CLICK_MINE,
  CODE,
  FLAG_CELL,
  NORMALIZE_CELL,
  OPEN_CELL,
  QUESTION_CELL,
  TableContext,
} from "./Minesweeper";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.OPENED:
      return { background: "white " };
    case CODE.NORMAL:
      return;
    case CODE.QUESTION:
      return { background: "wheat" };
    case CODE.FLAG:
      return { background: "green" };
    case CODE.QUESTION_MINE:
      return { background: "wheat" };
    case CODE.FLAG_MINE:
      return { background: "green" };
    case CODE.CLICKED_MINE:
      return { background: "red" };
    case CODE.MINE:
      return;
    default:
      return { background: "white" };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.OPENED:
      return;
    case CODE.NORMAL:
      return "";
    case CODE.QUESTION:
      return "❓";
    case CODE.FLAG:
      return "🚩";
    case CODE.QUESTION_MINE:
      return "❓";
    case CODE.FLAG_MINE:
      return "🚩";
    case CODE.CLICKED_MINE:
      return "💣";
    case CODE.MINE:
      return "❌";
    default:
      return "";
  }
};

const Td = ({ rowIndex, colIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const handleTdClick = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][colIndex]) {
      case CODE.OPENED:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, col: colIndex });
        return;
    }
  }, [tableData[rowIndex][colIndex], halted]);

  const handleTdContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      if (halted) {
        return;
      }
      switch (tableData[rowIndex][colIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, col: colIndex });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, col: colIndex });
          return;
      }
    },
    [tableData[rowIndex][colIndex], halted]
  );
  return (
    <td
      style={getTdStyle(tableData[rowIndex][colIndex])}
      onClick={handleTdClick}
      onContextMenu={handleTdContextMenu}
    >
      {getTdText(tableData[rowIndex][colIndex])}
    </td>
  );
};

export default Td;
