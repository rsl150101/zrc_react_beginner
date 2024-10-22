import React, { useContext } from "react";
import Td from "./Td";
import { TableContext } from "./Minesweeper";

const Tr = ({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  return (
    <tr>
      {tableData[0] &&
        Array(tableData[0].length)
          .fill()
          .map((_, i) => (
            <Td key={`col_${i}`} rowIndex={rowIndex} colIndex={i} />
          ))}
    </tr>
  );
};

export default Tr;
