import React, { useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./Minesweeper";

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((_, i) => (
            <Tr key={`row_${i}`} rowIndex={i} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
