import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Recovery from "./components/Recovery";
import Register from "./components/Register";
import Login from "./components/Login";
import Reset from "./components/Reset";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="recovery" element={<Recovery />} />
          <Route path="reset" element={<Reset />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
