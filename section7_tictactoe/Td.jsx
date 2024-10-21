import React, { memo, useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ cellData, rowIndex, cellIndex, dispatch }) => {
  const handleTdClick = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return <td onClick={handleTdClick}>{cellData}</td>;
});

export default Td;
