import PropTypes from "prop-types";

import Squares from "./Squares";
import newSquares from "./newSquares";


const sorted = (x, y) => {
  return [x, y].sort((a, b) => a - b);
};

const newId = (rs, re, cs, ce) => {
  let ids = [];
  for (let i = rs; i <= re; i++) {
    for (let j = cs; j <= ce; j++) {
      ids.push((i - 1) * 6 + j);
    }
  }
  return ids;
};

const rowValue = (value) => {
  return (value - ((value - 1) % 6) - 1) / 6 + 1;
};

const rowColValues = (value1, value2) => {
  const origin = sorted(parseInt(value1), parseInt(value2))[0];
  const target = sorted(parseInt(value1), parseInt(value2))[1];

  return {
    RS: rowValue(origin),
    RE: rowValue(target),
    CS: sorted(
      origin - (rowValue(origin) - 1) * 6,
      target - (rowValue(target) - 1) * 6
    )[0],
    CE: sorted(
      origin - (rowValue(origin) - 1) * 6,
      target - (rowValue(target) - 1) * 6
    )[1],
  };
};

function Rows({ row, counter, ids, setIds, squares, setSquares }) {
  const mouseUp = (e) => {
    e.preventDefault();

    if (!e.shiftKey) counter.current++;

    let newArea;

    if (ids.checked) {
      newArea = rowColValues(ids.originID, ids.targetID);

      setIds((state) => {
        return { ...state, checked: false };
      });
    } else {
      newArea = rowColValues(parseInt(e.target.id), parseInt(e.target.id));
    }

    // const squaresBefore = { ...squares };

    const squaresNew = newId(newArea.RS, newArea.RE, newArea.CS, newArea.CE);

    // const squaresAfter = newSquares(squaresBefore, squaresNew, counter.current);

    setSquares((square) => {
      return newSquares({ ...square }, squaresNew, counter.current, e.shiftKey);
    });
  };

  return (
    <div className="row">
      {[...Array(6).keys()].map((x) => (
        <Squares key={x} row={row + 1} col={x + 1} mouseUp={mouseUp} squares={squares} />
      ))}
    </div>
  );
}

export default Rows;

Rows.propTypes = {
  row: PropTypes.any,
  counter: PropTypes.any,
  ids: PropTypes.any,
  setIds: PropTypes.any,
  squares: PropTypes.any,
  setSquares: PropTypes.any,
};
