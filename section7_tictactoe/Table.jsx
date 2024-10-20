import React from "react";
import Tr from "./Tr";

const Table = ({ tableData }) => {
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((_, i) => (
          <Tr rowData={tableData[i]} />
        ))}
    </table>
  );
};

export default Table;
