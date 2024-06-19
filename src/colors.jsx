export function colors(key) {
  const color = [
    "#E4BDB5",
    "#C5766E",
    "#B72D21",
    "#E75630",
    "#AD5430",
    "#785436",
    "#A97B44",
    "#DBA357",
    "#F4B620",
    "#ABA247",
    "#7C9A82",
    "#5E6F6C",
    "#3E516B",
    "#6391DD",
    "#98C7FD",
    "#B1BCC0",
    "#CCCFCF",
    "#E4E2DE",
  ];

  return color[(key - 1) % 18];
}
