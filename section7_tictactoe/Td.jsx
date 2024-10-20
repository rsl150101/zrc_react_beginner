import React, { useCallback } from "react";
import { CHANGE_TURN, CLICK_CELL } from "./TicTacToe";

const Td = ({ cellData, rowIndex, cellIndex, dispatch }) => {
  const handleTdClick = useCallback(() => {
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    dispatch({ type: CHANGE_TURN });
  });
  return <td onClick={handleTdClick}>{cellData}</td>;
};

export default Td;
