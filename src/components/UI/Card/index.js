const Card = ({title, myImage,...restParams}) => {
  return (
    <>
      <p>{title}</p>
      <img src={myImage} {...restParams} />
    </>
  );
};

export default Card;
