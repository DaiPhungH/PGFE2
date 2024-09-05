const TableCell = ({ value }) => {
  return (
    <td>
      <p
        style={{
          width: "100%",
          minWidth: "75px",
          border: "0.5px solid blue",
          borderRadius: "15%",
        }}
      >
        {value}
      </p>
    </td>
  );
};

export default TableCell;
