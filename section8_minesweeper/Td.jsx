import React, { useContext } from "react";
import { CODE, TableContext } from "./Minesweeper";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.OPENED:
      return;
    case CODE.NORMAL:
      return;
    case CODE.QUESTION:
      return;
    case CODE.FLAG:
      return;
    case CODE.QUESTION_MINE:
      return;
    case CODE.FLAG_MINE:
      return;
    case CODE.CLICKED_MINE:
      return;
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
      return;
    case CODE.QUESTION:
      return;
    case CODE.FLAG:
      return;
    case CODE.QUESTION_MINE:
      return;
    case CODE.FLAG_MINE:
      return;
    case CODE.CLICKED_MINE:
      return;
    case CODE.MINE:
      return;
    default:
      return "";
  }
};

const Td = ({ rowIndex, colIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <td style={getTdStyle(tableData[rowIndex][colIndex])}>
      {getTdText(tableData[rowIndex][colIndex])}
    </td>
  );
};

export default Td;
