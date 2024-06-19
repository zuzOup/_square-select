import PropTypes from "prop-types";
// import RectangleSelection from "react-rectangle-selection";

import ReactRectangleSelection from "./ReactRectangleSelection";

import { useRef, useState } from "react";
import Rows from "./Rows";

function SelectionPart({ rows, setSquares, setItems, squares }) {
  const [ids, setIds] = useState({ originID: 0, targetID: 0, checked: false });

  const counter = useRef(0);

  return (
    <ReactRectangleSelection
      onSelect={(e, id) => {
        setIds({
          originID: id.originID,
          targetID: id.targetID,
          checked: true,
        });
      }}
      style={{
        backgroundColor: "rgba(0,0,255,0.4)",
        border: "hidden",
      }}
    >
      {[...Array(rows).keys()].map((x) => (
        <Rows
          key={x}
          row={x}
          counter={counter}
          ids={ids}
          setIds={setIds}
          setSquares={setSquares}
          squares={squares}
          setItems={setItems}
        ></Rows>
      ))}
    </ReactRectangleSelection>
  );
}

export default SelectionPart;

SelectionPart.propTypes = {
  rows: PropTypes.any,
  setSquares: PropTypes.any,
  setItems: PropTypes.any,
  squares: PropTypes.any,
};
