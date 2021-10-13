import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import api from "./services/api";
import { TokenServices } from "./services/TokenServices";

function App() {
  useEffect(() => {
    async function getToken() {
      const token = await localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        const data = {
          username: "lozinho",
          password: "lozinho",
          email: "lozinho123333@gmail.com",
        };
        await TokenServices.getToken({
          username: data.username,
          password: data.password,
        }).then((res) => {
          const token = res.data.token;
          if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
          }
        });
      }
    }
    getToken();

    // userApi.addUser(data);
  });

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
}

export default App;
