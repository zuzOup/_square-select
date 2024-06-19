import PropTypes from "prop-types";

import { colors } from "./colors";

const flipObject = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    acc[obj[cur]]
      ? (acc[obj[cur]] = [...acc[obj[cur]], parseInt(cur)])
      : (acc[obj[cur]] = [parseInt(cur)]);
    return acc;
  }, {});
};

const gridNumbers = (arr) => {
  const row = (num) => {
    return (num - 1 - ((num - 1) % 6)) / 6 + 1;
  };

  const column = (num) => {
    return ((num - 1) % 6) + 1;
  };

  const array = [...arr];

  let start;
  let end;

  if (ArrayBuffer.length > 1) {
    start = array.shift();
    end = array.pop();
  } else {
    start = array[0];
    end = array[0];
  }

  const RS = row(start);
  const RE = row(end) + 1;

  const CS = column(start);
  const CE = column(end) + 1;

  return { RS, RE, CS, CE };
};

function Input({ squares }) {
  const flippedSquares = flipObject(squares);

  Object.values(flippedSquares).forEach((x) => {
    console.log(gridNumbers(x));
  });

  return Object.keys(flippedSquares)
    .sort((a, b) => a - b)
    .map((item) => (
      <div key={item} style={{ backgroundColor: `${colors(item)}` }}>
        {` ${item} ... RowStart: ${item}   RowEnd: ${item}  ColStart: ${item}   ColEnd: ${item} `}
      </div>
    ));
}

export default Input;

Input.propTypes = { squares: PropTypes.object };
