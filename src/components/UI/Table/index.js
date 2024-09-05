import TableRow from "./TableRow";

const Table = ({ rowNum, colNum }) => {
  // rowNum số dòng - số
  // colNum số cột - số

  const arr = [];
  for (let i = 0; i < rowNum; i++) {
    arr.push(<TableRow key={i - 3} cols={colNum} />);
  }

  return (
    <table>
      <TableRow
        key={"Header"}
        isHeader={true}
        titles={["STT", "Name", "Age", "DOB", "Address"]}
      />
      {arr.map((item) => item)}
    </table>
  );
};

export default Table;
