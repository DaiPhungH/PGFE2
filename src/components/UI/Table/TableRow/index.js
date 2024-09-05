import TableCell from "../TableCell";

const TableRow = ({ cols, isHeader, titles }) => {
  const arr = [];

  let result = <></>;

  if (isHeader) {
    for (let item of titles) {
      arr.push(<TableCell key={item + 10} value={item} />);
    }
  } else {
    for (let i = 0; i < cols; i++) {
      arr.push(<TableCell key={i - 10} value={i} />);
    }
  }
  result = <tr>{arr.map((item) => item)}</tr>;

  return <>{result}</>;
};

export default TableRow;
