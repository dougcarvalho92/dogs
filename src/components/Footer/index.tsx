import { ReactComponent as Dogs } from "../../assets/images/dogs-footer.svg";

import "./style.css";
const Footer = () => {
  return (
    <footer className="footer">
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
