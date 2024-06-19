// const itemsToSquares = flipObject(squaresBefore);

let newIDs;
let itemsToSquares;
let squaresBefore;
let rowValue;
let flipObject;
let counter;

newIDs.forEach((x) => {
  const onlyCol =
    itemsToSquares[squaresBefore[x]] &&
    itemsToSquares[squaresBefore[x]].filter((x) => !newIDs.includes(x));

  const onlyColFitered =
    itemsToSquares[squaresBefore[x]] &&
    onlyCol
      .map((x) => x % 6)
      .reduce((acc, cur) => {
        acc[cur] ? acc[cur]++ : (acc[cur] = 1);
        return acc;
      }, {});

  let connected = true;

  if (onlyCol) {
    for (let i = 1; i < onlyCol.length; i++) {
      if (onlyCol[i] - onlyCol[i - 1] !== 1 && onlyCol[i] - onlyCol[i - 1] !== 6) {
        connected = false;
      }
    }
  }

  console.log(connected);

  if (
    !(
      connected &&
      onlyCol &&
      Object.values(onlyColFitered).every((x) => x === Object.values(onlyColFitered)[0])
    ) &&
    !(
      connected &&
      itemsToSquares[squaresBefore[x]] &&
      itemsToSquares[squaresBefore[x]].every(
        (square) => rowValue(square) === rowValue(itemsToSquares[squaresBefore[x]][0])
      )
    ) &&
    squaresBefore[x] > 0 &&
    squaresBefore[x] !== counter.current
  ) {
    const item = squaresBefore[x];

    // let changedItems

    const row = Array.from(new Set(onlyCol.map((x) => rowValue(x)))).length;

    const toBeChanged = Object.keys(squaresBefore)
      .filter((square) => squaresBefore[square] === squaresBefore[x])
      .map((square) => parseInt(square));

    let changedItems = [];

    if (row === 1) {
      const rowIndex = toBeChanged.indexOf(x);
      changedItems = toBeChanged.splice(rowIndex);
    } else {
      changedItems = toBeChanged.filter((square) => {
        return square >= 6 * rowValue(x) - 5 && square < 6 * rowValue(x) + 1;
      });
    }

    const difference = itemsToSquares[squaresBefore[x]].filter(
      (x) => !changedItems.includes(x)
    );

    changedItems.forEach((square) => delete squaresBefore[square]);

    let index;

    for (let i = 1; i < difference.length; i++) {
      if (rowValue(difference[i]) - rowValue(difference[i - 1]) > 1) {
        index = i;
      }
    }

    if (index) {
      let toBeDeleted = difference.splice(index);

      const flippedNew = flipObject(squaresBefore)[item];

      if (
        toBeDeleted.length !== flippedNew.length &&
        !toBeDeleted.every((x, i) => x === flippedNew[i])
      ) {
        toBeDeleted.forEach((square) => delete squaresBefore[square]);
      }
    }
  }
  squaresBefore[x] = counter.current;
});
