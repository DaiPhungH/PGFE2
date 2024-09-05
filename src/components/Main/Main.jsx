
import "bootstrap/dist/css/bootstrap.css";
import HeaderComponent from "../Header/Header";
import BodyComponent from "../Body/Body";
import Footer from "../Footer/Footer";

const Main = () => {
  return (
    <div>
    <HeaderComponent/>
    <BodyComponent/>
    <Footer/>
    </div>
  );
};

export default Main;