import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Head from "../../components/Head";
import api from "../../services/api";
import { TokenServices } from "../../services/TokenServices";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      const token = await localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        TokenServices.validateToken().then((result) => {
          if (result.status === 403) {
            localStorage.clear();
            api.defaults.headers.common["Authorization"] = "";
            navigate("/auth");
          }
        });
      }
    }
    getToken();
  }, [navigate]);
  return <Head title="Home" />;
};

export default Home;
