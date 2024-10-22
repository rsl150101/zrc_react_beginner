import React, { useCallback, useState } from "react";

const Form = () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);

  const handleRowChange = useCallback((e) => {
    setRow(e.target.value);
  }, []);
  const handleColChange = useCallback((e) => {
    setCol(e.target.value);
  }, []);
  const handleMineChange = useCallback((e) => {
    setMine(e.target.value);
  }, []);
  const handleGameStartForm = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <form onSubmit={handleGameStartForm}>
      <input
        type="number"
        placeholder="Row"
        value={row}
        onChange={handleRowChange}
      />
      <input
        type="number"
        placeholder="Column"
        value={col}
        onChange={handleColChange}
      />
      <input
        type="number"
        placeholder="Total Mine"
        value={mine}
        onChange={handleMineChange}
      />
      <button>Start</button>
    </form>
  );
};

export default Form;
