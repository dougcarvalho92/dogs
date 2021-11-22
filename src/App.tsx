import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

import "./assets/css/global.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <AppRoutes />
        {/* <Footer /> */}
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
