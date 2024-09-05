const Button = ({ title, id, onClick }) => {
  return (
    <button id={id} onClick={onClick}>
      {title}
    </button>
  );
};
// JS
// Object
// key: value

export default Button;
