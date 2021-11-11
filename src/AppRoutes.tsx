import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

import { UserProvider } from "./context/UserContext";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
