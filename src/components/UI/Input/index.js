import { useState } from "react";

const Input = ({
  title,
  displayHorizon,
  capitalTitle,
  limitWord = 10,
  value,
  setValue,
  ...restParams
}) => {

  const [style, setStyle] = useState({ border: "1px solid black" });

  const onChangeHandler = (event) => {
    // 1. Check style\
    // Mỗi khi phần tử nó thay đổi về 1 giá trị nào đấy, thì nó sẽ gọi onChange
    // -> value của input thay đổi -> thay đổi
    // Mỗi lần nhập vào 1 phím thì nó sẽ gọi hàm này 1 lần
    // hieuntm2
    setValue(event.target.value);
    if (value.length === limitWord) {
      setStyle({ border: "1px solid blue" });
    } else {
      setStyle({ border: "1px solid red" });
    }
  };

  let result = <></>;

  // 2. Data render check
  if (displayHorizon) {
    result = (
      <p>
        <span>{title} </span>
        <span>
          <input
            value={value}
            style={style}
            {...restParams}
            onChange={onChangeHandler}
          />
        </span>
      </p>
    );
  } else {
    result = (
      <>
        <p>{title}</p>
        <input
          value={value}
          style={style}
          {...restParams}
          onChange={onChangeHandler}
        />
      </>
    );
  }

  // 3. Title check
  if (capitalTitle) {
    title = title.toUpperCase();
  }

  return <>{result}</>;
};

export default Input;
