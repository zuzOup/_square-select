import "./App.css";

import { useState } from "react";

import Input from "./Input";
import SelectionPart from "./SelectionPart";



function App() {
  const [rows, changeRows] = useState(4);

  const [squares, setSquares] = useState({});

  const onChangeHandle = (e) => {
    changeRows(parseInt(e.target.value));

    setSquares((squares) => {
      const newSquares = { ...squares };
      Object.keys(newSquares)
        .map((x) => {
          return parseInt(x);
        })
        .filter((x) => x > parseInt(e.target.value) * 6)
        .forEach((x) => delete newSquares[x]);

      return newSquares;
    });
  };

  return (
    <>
      <div className="page">
        <div>
          <input
            id="input"
            name="input"
            type="number"
            min="1"
            max="6"
            value={rows}
            onChange={onChangeHandle}
          ></input>
          <div id="square">
            <SelectionPart
              rows={rows}
              setSquares={setSquares}
              squares={squares}
             
            />
          </div>
        </div>
        <div className="items">
          <Input squares={squares}  />
        </div>
      </div>
    </>
  );
}

export default App;
