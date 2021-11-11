import { Navigate, Route, Routes } from "react-router";
import LoginForm from "../../components/Login";
import Recovery from "../../components/Recovery";
import Register from "../../components/Register";
import Reset from "../../components/Reset";
import { useUser } from "../../context/UserContext";
import "./style.css";

const Auth = () => {
  const { signed } = useUser();
  return signed ? (
    <Navigate to="/conta" />
  ) : (
    <section className="login">
      <div className="forms">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="register" element={<Register />} />
          <Route path="recovery" element={<Recovery />} />
          <Route path="reset" element={<Reset />} />
        </Routes>
      </div>
    </section>
  );
};

export default Auth;
